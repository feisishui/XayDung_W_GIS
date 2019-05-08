import LayerInfo from '../../services/map/models/LayerInfo';
import LayerHelper from './LayerHelper';
import MapImageLayer = require('esri/layers/MapImageLayer');
import Collection = require('esri/core/Collection');
export class LayerHelperDuLieuHaTangKyThuat {
  public assignLayer(layerInfos: LayerInfo[], APP_NAME?: string): __esri.Layer[] {
    // mục đích tăng tốc độ hiển thị dữ liệu
    // thay vì hiển thị dữ liệu bằng cách sử dụng FeatureLayer
    // thì nên sử dụng MapImageLayer và chỉ hiển thị LayerId phù hợp
  let assignLayers = LayerHelper.assignLayer(layerInfos, APP_NAME);
    let tmpLayers = new Collection(assignLayers); // sử dụng lại phương thức cũ
    let layers = new Collection(assignLayers);
    // lọc ra các nhóm có id bắt đầu bằng chữ htrang và chữ cuối là GR
    const grLayers = tmpLayers.filter(f => f.type === 'group' && f.id.startsWith('htrang') && f.id.endsWith('GR') && (f as __esri.GroupLayer).layers.length > 0);
    grLayers.forEach((gr: __esri.GroupLayer) => {
      layers.remove(gr);
      let imageLayer = new MapImageLayer({
        url:(gr.layers.getItemAt(0) as __esri.FeatureLayer).url.replace('FeatureServer','MapServer'),
        id: gr.id,
        title: gr.title
      });
      // tao sublayer
      let subLayers = gr.layers.map((layer) => {
        let featureLayer = layer as __esri.FeatureLayer;
        return {
          visible: true,
          id: featureLayer.layerId,
          title: layer.title,
          definitionExpression: featureLayer.definitionExpression
        } as __esri.Sublayer
      });
      imageLayer.sublayers = subLayers;
      layers.push(imageLayer);
    });

    return layers.toArray();
  }
}
import MapImageLayer = require('esri/layers/MapImageLayer');
import FeatureLayer from '../layers/FeatureLayer';
import GroupLayer = require('esri/layers/GroupLayer');
import LayerInfo from '../../services/map/models/LayerInfo';
import { LAYER, APP_LAYER } from '../../constants/map.constant';
import LayerList = require('esri/widgets/LayerList');
export default class LayerHelper {
  public static assignLayer(layerInfos: LayerInfo[], APP_NAME?: string): Array<__esri.Layer> {
    let layers: Array<__esri.Layer> = [];

    // lấy dữ liệu
    const lopDuLieu = layerInfos.filter(f =>
      ((APP_NAME && APP_LAYER[APP_NAME]
        && (APP_LAYER[APP_NAME].indexOf('*') !== -1
          || APP_LAYER[APP_NAME].indexOf(f.LayerID) !== -1)
      ) || !APP_NAME)
      && f.IsView // được quyền xem
    );
    lopDuLieu.forEach(layerInfo => {
      let layerModel: __esri.Layer | null = null;
      if (layerInfo.Url.endsWith('MapServer')) {
        layerModel = new MapImageLayer({
          url: layerInfo.Url,
          id: layerInfo.LayerID,
          title: layerInfo.LayerTitle,
          visible: layerInfo.IsVisible
        });
      } else if (layerInfo.LayerID.endsWith('LYR')) {
        layerModel = new FeatureLayer({
          title: layerInfo.LayerTitle,
          url: layerInfo.Url,
          id: layerInfo.LayerID,
          visible: layerInfo.IsVisible,
          outFields: layerInfo.OutFields ? layerInfo.OutFields.split(',') : ['*'],
          definitionExpression: layerInfo.Definition
        });
        (layerModel as FeatureLayer).layerInfo = layerInfo;
      }

      if (layerModel) {
        // nếu có group
        if (layerInfo.GroupLayer) {
          const groupID = layerInfo.GroupLayer.ID;
          // kiểm tra id có tồn tại trong grouplayer hay chưa
          let groupLayer = layers.find(l => l.id === groupID) as GroupLayer;
          if (!groupLayer) {
            groupLayer = new GroupLayer({
              title: layerInfo.GroupLayer.Name, id: layerInfo.GroupLayer.ID
            });
            layers.push(groupLayer); // đưa group vào danh sách trả về
          }
          groupLayer.add(layerModel); // thêm layer vào group
        } else {
          layers.push(layerModel); // không có group thì thêm trực tiếp vào danh sách trả về
        }
      }
    });
    return layers;
  }

  public static createLayerList(view: __esri.MapView | __esri.SceneView) {
    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event: any) {
        const item = event.item;
        item.actionsSections = [];

        // nếu là dữ liệu nền hoặc dma thì cho tăng giảm độ mờ
        if (item.layer.id === LAYER.BASE_MAP) {
          item.actionsSections.push(
            [{
              title: 'KML',
              className: 'esri-icon-public',
              id: 'kml'
            }]
          );
          item.actionsSections.push(
            [{
              title: 'Tăng mờ',
              className: 'esri-icon-up',
              id: 'decrease-opacity'
            }, {
              title: 'Giảm mờ',
              className: 'esri-icon-down',
              id: 'increase-opacity'
            }]
          );
        }

        // nếu là group
        if (item.layer.type === 'group') {
          item.actionsSections.push(
            [{
              title: 'Hiện tất cả',
              className: 'esri-icon-visible',
              id: 'visible'
            }, {
              title: 'Đóng tất cả',
              className: 'esri-icon-non-visible',
              id: 'non-visible'
            }]
          );
          item.actionsSections.push([{
            title: 'KML',
            className: 'esri-icon-public',
            id: 'kml'
          }]);
        } else if (item.layer.type === 'feature') {
          item.actionsSections.push([{
            title: 'KML',
            className: 'esri-icon-public',
            id: 'kml'
          }]);
        }
        item.panel = {
          content: 'legend',
          open: false
        };
      }
    });

    layerList.on('trigger-action', LayerHelper.layerListTriggerAction);
    return layerList;
  }

  private static layerListTriggerAction(event: any) {

    // The layer visible in the view at the time of the trigger.
    var layer = event.item.layer;
    if (!layer) { return; }
    // Capture the action id.
    var id = event.action.id;

    switch (id) {
      case 'increase-opacity':
        if (layer.opacity < 1) { layer.opacity += 0.25; }
        break;
      case 'decrease-opacity':
        if (layer.opacity > 0) { layer.opacity -= 0.25; }
        break;
      case 'visible':
        (layer as __esri.GroupLayer).layers.forEach(f => f.visible = true);
        break;
      case 'non-visible':
        (layer as __esri.GroupLayer).layers.forEach(f => f.visible = false);
        break;
      case 'kml':
        function download(url: string) {
          var a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.click();
        }
        if (layer.type === 'feature') {
          download(
            ((layer as __esri.FeatureLayer).url.replace("FeatureServer", `MapServer/generatekml?docName=${event.item.title}&layers=${(layer as __esri.FeatureLayer).layerId}`)));
        } else if (layer.type === 'group') {
          let layers = layer.layers as __esri.Collection<__esri.Layer>;
          if (layers.length > 0) {
            layers.forEach(layer => {
              if (layer.type === 'feature' && (layer as __esri.FeatureLayer).url) {
                download(((layer as __esri.FeatureLayer).url.replace("FeatureServer", `MapServer/generatekml?docName=${event.item.title}&layers=${(layer as __esri.FeatureLayer).layerId}`)));
              }
            })
          }
        } else if (layer.type === 'map-image') {
          download(layer.url + `/generatekml?docName=${event.item.title}`);
        }
        break;
      default:
        break;
    }
  }

}
import MapImageLayer = require('esri/layers/MapImageLayer');
import FeatureLayer from '../layers/FeatureLayer';
import GroupLayer = require('esri/layers/GroupLayer');
import UniqueValueRenderer = require('esri/renderers/UniqueValueRenderer');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import LayerInfo from '../../services/map/models/LayerInfo';
import { LAYER, APP_LAYER } from '../../constants/map.constant';
import * as SuCo from '../../services/map/SuCo/suco.model';
import LayerList = require('esri/widgets/LayerList');
import { checkAppDonVi } from '../../services/map/SuCo/suco.helper';
import Auth from '../../modules/Auth';
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
        const download = (url: string) => {
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

  public static getSuCoRenderer() {
		const isSCTT = checkAppDonVi();
		return new SuCoRenderer().renderer(isSCTT);
	}

}


class SuCoRenderer {
	private readonly baseUrl = '/images/map/suco';
	public renderer(isSCTT: boolean = false) {
		if (!isSCTT)
			return new UniqueValueRenderer({
				field: 'LinhVuc', field2: 'TinhTrang', fieldDelimiter: '-',
				uniqueValueInfos: this.getUniqueValueInfos(),
			});
		else {
			return new UniqueValueRenderer({
				valueExpression: this.getSCTTValueExpression(),
				uniqueValueInfos: this.getUniqueValueInfos(),
			});
		}
	}

	private getSCTTValueExpression() {
		// mục đích của việc này để lấy được tình trạng sự cố của đơn vị thông qua
		// mã sự cố thông tin được tạo theo cú pháp {TinhTrang}-{MaSCTT}
		// mảng SCTTs trong lớp Sự cố sẽ chứa 0-* mã theo cấu trúc trên được ngăn nhau bởi dấu ;
		// sử dụng arcade expression của arcgis js để thực hiện
		// https://developers.arcgis.com/arcade/
		var user = Auth.getUser();
		if (!user) return '';
		var text = `$feature.MaSCTTs`; // lấy giá trị MaSCTTs
		var text2 = `REPLACE(REPLACE(REPLACE(${text},'HTH-',''),'DXL-',''),'MTN-','')`; // xóa {TinhTrang}- chỉ để lại {MaSCTT}
		// tạo một mảng bằng cách tách chuỗi với ký tự ;
		// Mảng này không chứa {TinhTrang} nhằm mục đích khi sử dụng phương thức IndexOf truyền vào {MaDonVi}-{MaSuCo} = {MaSCTT} thì có trả về kết quả đúng chứ nếu không có mảng này nó sẽ ở dạng {TinhTrang}-{MaDonVi}-{MaSuCo} != {MaSCTT}
		var tmpArray = `SPLIT(${text2},';')`;

		// tạo một mảng bằng cách tách chuỗi với ký tự ;
		// Mảng này có chứa {TinhTrang} để bước tiếp theo có thể cắt chuỗi để lấy {TinhTrang}
		var baseArray = `SPLIT(${text},';')`;

		// tạo id để tìm vị trí thứ tự mã cần tìm theo tài khoản với cấu trúc {MaDonVi}-{MaSuCo}
		// MaDonVi được xác nhận theo tên tài khoản với cấu trúc qlsc_{MaDonVi}
		var id = `'${user.username.replace('qlsc_', '')}-'+$feature.MaSuCo`;

		// lấy vị trí trong mảng
		var index = `IndexOf(${tmpArray},${id})`;

		// nếu tồn tại vị trí thì bây giờ sẽ lấy giá trị của vị trí đó trong mảng gốc
		// ví dụ tìm được mã ở vị trí thứ 1 => baseArray[1] = {TinhTrang}-{MaSCTT}
		// sử dụng hàm LEFT để lấy 3 ký tự đầu tiên ({TinhTrang} sẽ có 3 ký tự - MTN,DXL,HTH..) => {TinhTrang}
		var tinhTrang = `IIF(${index} > -1, LEFT(${baseArray}[${index}],3), null)`;

		// trả về kết quả là {LinhVuc}-{TinhTrang} để phù hợp với giá trị trong uniqueValueInfos
		return `$feature.LinhVuc+'-'+${tinhTrang}`;
	}

	private getUniqueValueInfos() {
		let uniqueValueInfos: __esri.UniqueValueRendererUniqueValueInfos[] = [];
		[SuCo.LinhVuc.CapNuoc, SuCo.LinhVuc.CayXanh, SuCo.LinhVuc.ChieuSang,
		SuCo.LinhVuc.DienLuc, SuCo.LinhVuc.GiaoThong, SuCo.LinhVuc.ThoatNuoc, SuCo.LinhVuc.VienThong]
			.forEach(linhVuc =>
				this.renderUniqueValue(linhVuc)
					.forEach(uniqueRender =>
						uniqueValueInfos.push(uniqueRender)));
		return uniqueValueInfos;
	}

	private renderUniqueValue(linhVuc: number) {

		return [SuCo.TinhTrang.MoiTiepNhan, SuCo.TinhTrang.DangXuLy, SuCo.TinhTrang.HoanThanh]
			.map(m => {
				const value = `${linhVuc != null ? linhVuc : -1}-${m}`;
				return {
					value,
					symbol: new PictureMarkerSymbol({
						width: 20, height: 20,
						url: `${this.baseUrl}/${value}.png`
					})
				} as __esri.UniqueValueRendererUniqueValueInfos
			});
	}
}
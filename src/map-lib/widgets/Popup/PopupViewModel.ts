import { LayerInfo, PopupAction, LayerFieldInfo } from '../Popup';
import PopupTemplate = require('esri/PopupTemplate');
import Action = require('esri/support/actions/ActionButton');
import { FIELDS_NO_EDIT } from '../../../constants/map.constant';
import Evented = require('esri/core/Evented');

export default class PopupViewModel extends Evented{

  private assignParams(layerInfo: LayerInfo) {
    layerInfo.showObjectID = layerInfo.showObjectID !== undefined ? layerInfo.showObjectID : false;
    layerInfo.showGlobalID = layerInfo.showGlobalID !== undefined ? layerInfo.showGlobalID : false;
    layerInfo.showAttachments = layerInfo.showAttachments !== undefined ? layerInfo.showAttachments : false;
    layerInfo.isEditable = layerInfo.isEditable !== undefined ? layerInfo.isEditable : false;
  }

  /**
   * popupFeatureLayer
   */
  public popupFeatureLayer(layerInfo: LayerInfo) {
    this.assignParams(layerInfo);
    const { isEditable, showDeleteButton, showAttachments, showGlobalID, showObjectID,
      actions } = layerInfo;
    const layer = layerInfo.layer as __esri.FeatureLayer;
    layer.when((_: any) => {
      let _actions: __esri.ActionBase[] = [];

      // nếu có action thì thêm vào
      if (actions && actions.length > 0) {
        actions.forEach(a => _actions.push(a));
      }

      // nếu được phép chỉnh sửa
      if (isEditable) {
        _actions.push(new Action({
          id: PopupAction.EDIT + '',
          title: 'Cập nhật',
          className: 'esri-icon-edit',
        }));

        // nếu point thì cho chuyển vị trí
        if (layer.geometryType === 'point')
          _actions.push(new Action({
            id: PopupAction.MOVE + '',
            title: 'Di chuyển không gian',
            className: 'fas fa-people-carry',
          }));
      }
      // nếu hiện nút xóa
      if (showDeleteButton) {
        _actions.push(new Action({
          id: PopupAction.DELETE + '',
          title: 'Xóa',
          className: 'esri-icon-erase',
        }));
      }
      let layerFields: LayerFieldInfo[];
      if (layerInfo.layerFields) {
        layerFields = layerInfo.layerFields.slice();
        layerFields.forEach(layerField => {
          let field = layer.fields.find(_field => _field.name === layerField.name);
          if (field) {
            if (!layerField.alias) {
              layerField.alias = field.alias;
            }
            layerField.domain = field.domain;
            layerField.type = field.type as any;
          }
        });
      } else {
        // nếu không có thì tự tạo

        // lấy tất cả field từ layer
        let _fields: __esri.Field[] = [];
        if (layer.outFields.indexOf('*') !== -1) {
          _fields = layer.fields;
        } else if (layer.outFields.length > 0) {
          // lọc danh sách field có trong outFields
          _fields = layer.fields.filter(f => layer.outFields.indexOf(f.name) !== -1);
        }

        _fields = _fields
          .filter(field =>
            field &&
            ((field.type === 'oid' && !showObjectID)// không cho phép hiển thị objectid
              || field.type === 'global-id' && !showGlobalID)        // không cho phép hiển thị global id
          );
        layerFields = _fields.map(m => {
          return {
            name: m.name,
            isEditable: isEditable === true ? FIELDS_NO_EDIT.indexOf(m.name) === -1 : true, // mặc định không cho chỉnh sửa,
            domain: m.domain,
            alias: m.alias,
            type: m.type
          } as LayerFieldInfo;
        });

        layerInfo.layerFields = layerFields;
      }
      // lấy fields để nhận name và alias

      let content = [{
        type: 'fields',
        fieldInfos: layerFields.map((m) => {
          return {
            fieldName: m.name,
            label: m.alias,
          };
        })
      }];

      if (showAttachments) {
        content.push({
          type: 'attachments'
        } as any);
      }
      var popupTemplate = new PopupTemplate({
        title: layer.title,
        content,
        actions: _actions as any
      });
      layer.popupTemplate = popupTemplate;
    });
  }

  /**
   * popupMapImageLayer
   */
  public popupMapImageLayer(layerInfo: LayerInfo) {
    this.assignParams(layerInfo);
    const layer = layerInfo.layer as __esri.MapImageLayer;
    layer.when((layerView:__esri.LayerView) => {
      // lấy sublayers
      const subLayers = layer.sublayers;
      subLayers.forEach(layer => {
        var popupTemplate = new PopupTemplate({
          title: layer.title,
          outFields: ['*'],
          content: (evt: { graphic: __esri.Graphic }) => {
            let html = `<table class="esri-widget__table"><tbody>`;

            for (let key in evt.graphic.attributes) {
              if (!(key.startsWith('SHAPE') || key === 'OBJECTID'))
                html += `<tr><th class="esri-feature__field-header">${key}</th><td class="esri-feature__field-data">‎${evt.graphic.attributes[key]}</td></tr>`
            }


            html += `</tbody></table>`;
            return html;
          }
        });
        layer.popupTemplate = popupTemplate;
      });
    });
  }
}
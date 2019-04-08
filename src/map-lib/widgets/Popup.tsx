import Action = require('esri/support/actions/ActionButton');
import PopupEditing from './Popup/Editing';
import PopupViewModel from './Popup/PopupViewModel';
import HighlightGraphic from '../support/HighlightGraphic';

export enum PopupAction {
  EDIT,
  DELETE,
  MOVE
}

export interface LayerFieldInfo {
  name: string;
  format?: object;
  isEditable?: boolean;
  alias?: string;
  domain?: __esri.Domain;
  type?: 'small-integer' | 'integer' | 'single'
  | 'double' | 'long' | 'string' | 'date' | 'oid' | 'geometry' | 'blob' | 'raster' | 'guid' | 'global-id' | 'xml';
}

export interface LayerInfo {
  layerFields: LayerFieldInfo[];
  isEditable?: boolean;
  layer: __esri.FeatureLayer | __esri.MapImageLayer;
  showAttachments?: boolean;
  showDeleteButton?: boolean;
  showObjectID?: boolean;
  showGlobalID?: boolean;
  actions?: __esri.ActionButton[] | __esri.ActionToggle[];
}

interface ConstructorProperties {
  layerInfos: LayerInfo[];
  view: __esri.MapView | __esri.SceneView;
}

class Popup {
  private view: __esri.MapView | __esri.SceneView;
  private layerInfos: LayerInfo[];
  private editing: PopupEditing;
  private highlight: HighlightGraphic;
  constructor(params: ConstructorProperties) {
    this.view = params.view;
    this.layerInfos = params.layerInfos;

    this.layerInfos.forEach(f => {
      this.initPopup(f);
    });
    this.editing = new PopupEditing({ view: this.view });
    this.highlight = new HighlightGraphic(this.view);
    this.registerEvent();
  }

  /**
   * Khởi tạo poup cho layer
   * @param layerInfo Định nghĩa những lớp hiển thị popup
   */
  private initPopup(layerInfo: LayerInfo) {
    layerInfo.layer.type === 'feature' && new PopupViewModel().popupFeatureLayer(layerInfo);
    layerInfo.layer.type === 'map-image' && new PopupViewModel().popupMapImageLayer(layerInfo);
  }

  /**
   * Đăng ký sự kiện
   */
  private registerEvent() {
    // đăng ký sự kiện khi click vào action
    this.view.popup.on('trigger-action', this.triggerActionHandler.bind(this));
    this.view.popup.watch('selectedFeature', (newValue: __esri.Graphic, oldValue: __esri.Graphic) => {
      this.highlight.removeAll();
      if (newValue && (!newValue.layer || (newValue.layer && newValue.layer.type !== 'feature'))) {
        this.highlight.add(newValue);
      } 
    })
  }

  private triggerActionHandler(event: {
    action: Action
  }) {
    let actionId = event.action.id;
    switch (actionId) {

      // sự kiện cập nhật
      case PopupAction.EDIT.toString():
        let layerInfos = this.layerInfos.find(f => f.layer.id === this.view.popup.selectedFeature.layer.id);
        if (layerInfos) {
          this.editing.render(layerInfos.layerFields);
        }
        break;
      // sự kiện xóa
      case PopupAction.DELETE.toString():
        this.editing.delete();
        break;

      case PopupAction.MOVE.toString():
        this.editing.moveGeometry();
        break;
      default:
        break;
    }
  }
}

export default Popup;
import Evented = require('esri/core/Evented');
type ParamConstructor = {
  view: __esri.MapView | __esri.SceneView;
};

type ViewEvent = {
  click: IHandle | null,
  move: IHandle | null
}

class MovingGeometryViewModel extends Evented {
  private params: ParamConstructor;
  private selectedFeature: __esri.Graphic | null = null;

  /**
   * Lưu trữ giá trị graphic khi di chuyển chuột trên bản đồ
   */
  public set graphicMoving(graphic: __esri.Graphic | null) {
    // nếu có graphic cũ thì xóa khỏi view
    this.params.view.graphics.removeMany(this.params.view.graphics.filter(f => f.attributes.id === 'MovingGeometryViewModel'));
    // gán lại giá trị
    // nếu graphic mới có giá trị thì thêm vào view
    if (graphic) {
      graphic.attributes = { id: 'MovingGeometryViewModel' };
      this.params.view.graphics.add(graphic);
    }
  }



  private viewEvent: ViewEvent = {
    click: null, move: null
  };


  constructor(params: ParamConstructor) {
    super();
    this.params = params;
    // đăng ký sự kiện nhấn chuột vào màn hình => cập nhật lại geometry theo điểm nhấn
    // tạo hiệu ứng di chuyển chuột tạo hình ảnh theo symbol hiện tại
  }

  public async move(graphic: __esri.Graphic) {
    try {
      this.reset();
      this.selectedFeature = graphic;

      this.registerClickEvent();
      this.registerMoveEvent();
    } catch (error) {
      throw error;
    }
  }

  private registerClickEvent() {
    this.viewEvent.click = this.params.view.on('click', this.viewClickEventHandle.bind(this))
  }

  private registerMoveEvent() {
    this.viewEvent.move = this.params.view.on('pointer-move', this.viewMoveEventHandle.bind(this));
  }

  private viewClickEventHandle(event: __esri.MapViewClickEvent) {
    if (this.selectedFeature
      && this.selectedFeature.layer
      && this.selectedFeature.layer.type === 'feature') {
      this.updateGeometry(
        this.selectedFeature.layer as __esri.FeatureLayer,
        this.selectedFeature.attributes.OBJECTID,
        event.mapPoint)
    } else {
      throw new Error('Không xác định được lớp dữ liệu đầu vào');
    }

  }

  private viewMoveEventHandle(event: __esri.MapViewPointerMoveEvent) {
    // tạo graphic mới theo symbol truyền vào
    if (this.selectedFeature) {
      let newGraphic = {
        geometry: this.params.view.toMap({ x: event.x, y: event.y }) as __esri.Geometry, //  chuyển đổi tọa độ màn hình sang tọa độ bản đồ
        symbol: { type: 'simple-marker' }
      } as __esri.Graphic;
      // thêm vào view
      this.graphicMoving = newGraphic;
    }
  }

  /**
   * Request arcgis server cập nhật lại geometry mới
   * @param layer Lớp dữ liệu cần cập nhật
   * @param objectId Đối tượng cần cập nhật
   * @param newGeometry Không gian mới
   */
  private async updateGeometry(layer: __esri.FeatureLayer, objectId: number, newGeometry: __esri.Geometry): Promise<boolean> {
    this.emit('update-geometry-start', { layer, objectId, geometry: newGeometry }); // báo sự kiện
    try {
      let updateFeature = {
        geometry: newGeometry, // cập nhật lại geometry mới
        attributes: { objectId } // theo objectid
      } as __esri.Graphic;
      const result = await layer.applyEdits({
        updateFeatures: [updateFeature]
      });

      this.emit('update-geometry-finish', {
        response: result,
        success: result.updateFeatureResults.length > 0 && !result.updateFeatureResults[0].error
      }); // báo sự kiện
      // nếu cập nhật thành công
      if (result.updateFeatureResults.length > 0 && !result.updateFeatureResults[0].error) {
        return true;
      }
    } catch (error) {
      throw error;
    } finally {
      this.reset();
    }
    return false;
  }

  private reset() {

    // xóa graphic
    this.selectedFeature = null;
    this.graphicMoving = null;

    // xóa sự kiện nhấn vào màn hình
    this.viewEvent.click && this.viewEvent.click.remove()
    this.viewEvent.move && this.viewEvent.move.remove()
    this.viewEvent.move = this.viewEvent.click = null;;
  }
}

export default MovingGeometryViewModel;
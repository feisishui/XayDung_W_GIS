import SketchViewModel = require('esri/widgets/Sketch/SketchViewModel');
import GraphicsLayer = require('esri/layers/GraphicsLayer');
import FeatureLayer from '../../layers/FeatureLayer';
import Evented = require('esri/core/Evented');

type Params = {
  view: __esri.MapView | __esri.SceneView
};

export default class LayerEditorViewModel extends Evented {
  private view: __esri.MapView | __esri.SceneView;
  private sketch: SketchViewModel;
  private graphicsLayer: GraphicsLayer;
  private layerEditing: FeatureLayer | undefined;
  constructor(params: Params) {
    super();
    this.graphicsLayer = new GraphicsLayer({ listMode: 'hide' });
    this.view = params.view;

    this.view.map.add(this.graphicsLayer);

    this.sketch = new SketchViewModel({
      view: params.view,
      layer: this.graphicsLayer,
      pointSymbol: { // used to symbolize points
        type: 'simple-marker',  // autocasts as new SimpleMarkerSymbol()
        style: 'square',
        color: 'red',
        size: '16px',
        outline: {  // autocasts as new SimpleLineSymbol()
          color: [255, 255, 0],
          width: 3  // points
        }
      } as any,
      polylineSymbol: { // used to symbolize polylines
        type: 'simple-line',  // autocasts as new SimpleMarkerSymbol()
        color: '#8A2BE2',
        width: '4',
        style: 'dash'
      } as any,
      polygonSymbol: { // used for symbolizing polygons
        type: 'simple-fill',  // autocasts as new SimpleMarkerSymbol()
        color: 'rgba(138,43,226, 0.8)',
        style: 'solid',
        outline: {
          color: 'white',
          width: 1
        }
      } as any
    });

    this.sketch.on('create-complete', this.addGraphic.bind(this));
    this.sketch.on('update-complete', this.updateGraphic.bind(this));
    this.sketch.on('update-cancel', this.updateGraphic.bind(this));
  }

  /**
   * draw
   */
  public draw(layer: FeatureLayer) {
    switch (layer.geometryType) {
      case 'point':
      case 'polygon':
      case 'polyline':
        if (!layer.visible) { layer.visible = true; } // nếu chưa hiển thị thì cho hiển thị

        // nếu màn hình chưa zoom đến thì cho zoom đến
        if (this.view.scale > layer.minScale) {
          this.view.scale = layer.minScale;
        }

        this.sketch.create(layer.geometryType, { mode: 'click' });
        this.layerEditing = layer;
        break;
      default:
        throw new Error('Không xác định được geometryType')
    }
  }

  private async addGraphic(event: any) {
    this.emit('create-complete', event);
    // nếu có lớp edit

    if (this.layerEditing) {
      // nếu như có typeID thì gán giá trị mặc định cho attributes
      // = giá trị đầu tiên của type
      let attributes = {};
      if (this.layerEditing.typeIdField) {
        attributes[this.layerEditing.typeIdField] = this.layerEditing.types[0].id;
        if (this.layerEditing.types[0]
          && this.layerEditing.types[0].templates
          && this.layerEditing.types[0].templates[0]
          && this.layerEditing.types[0].templates[0].prototype
        ) { attributes = { ...attributes, ...this.layerEditing.types[0].templates[0].prototype.attributes }; }
      } else {
        if (this.layerEditing.templates
          && this.layerEditing.templates[0]
          && this.layerEditing.templates[0].prototype) {
          attributes = { ...attributes, ...this.layerEditing.templates[0].prototype.attributes };
        }
      }

      const result = await this.layerEditing.applyEdits({
        addFeatures: [{ attributes, geometry: event.geometry } as any]
      });
      this.emit('add-complete',result);
      if (result.addFeatureResults) {
        let editResults = result.addFeatureResults as __esri.FeatureEditResult[];
        if (editResults.length > 0 && editResults[0].objectId) {
          // focus
          const features = (await this.layerEditing.queryFeatures({
            where: `OBJECTID = ${editResults[0].objectId}`,
            returnGeometry: true,
            outSpatialReference: this.view.spatialReference,
            outFields: ['*']
          })).features;
          this.view.popup.open({ features, updateLocationEnabled: true });
        }
      }
      // this.graphicsLayer.add(graphic);
    }
  }

  private updateGraphic(event: any) {
    event.graphic.geometry = event.geometry;
    this.graphicsLayer.add(event.graphic);
  }

}
// REACT
import * as React from 'react';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import SearchWidget = require('esri/widgets/Search');
import Locate = require('esri/widgets/Locate');
import BasemapToggle = require('esri/widgets/BasemapToggle');
import Measure from '../../map-lib/widgets/Measure';
import * as Popup from '../../map-lib/widgets/Popup';

// APP
import LayerInfo from '../../services/map/models/LayerInfo';
import layerUtil from '../../map-lib/support/LayerHelper';
import { LAYER } from '../../constants/map.constant';

type Props = {
  view?: __esri.MapView | __esri.SceneView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
};
type States = {
  isLoading: boolean
};

class QuanLyMangLuoiComponent extends React.PureComponent<Props, States> {
  private mapDiv: HTMLDivElement | undefined;
  private isLoadWidget: boolean = false;
  private isRegistryEvent: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillReceiveProps(props: Props) {
    // nếu props.view có giá trị và chưa đăng ký event
    if (props.view && !this.isRegistryEvent) {
      this.registerEvent(props.view);
      this.isRegistryEvent = true;
    }

    // nếu có view layerinfos và chưa load widget
    if (!this.isLoadWidget && props.view && props.layerInfos) {
      const { view, layerInfos } = props;
      view.when(() => {
        this.initWidget(view, layerInfos);
      });
      this.isLoadWidget = true;
    }
  }

  componentDidMount() {
    if (this.mapDiv) { this.props.loadMapDiv(this.mapDiv); }
  }

  private initWidget(view: __esri.MapView | __esri.SceneView, layerInfos: LayerInfo[]) {
    if (view && layerInfos) {
      view.when(() => {

        view.ui.move(['zoom'], 'bottom-right');
        // tìm kiếm
        var search = new SearchWidget({
          view: view,
          searchAllEnabled: false
        });
        view.ui.add(search, 'top-left');

        var layerList = layerUtil.createLayerList(view as any);
        var expand =
          new Expand({
            expandTooltip: 'Lớp dữ liệu',
            content: layerList
          });
        // expand.expand();
        view.ui.add(expand, 'top-left');
        // không có dòng này thì layerlist không load được legend
        new Legend({ view: view });

        view.popup.dockOptions = { position: 'top-left' };
        new Popup.default({
          view,
          layerInfos: view.map.allLayers.filter(f => f.id !== LAYER.BASE_MAP)
            .map(layer => {
              const layerInfo = layerInfos.find(info => layer.id === info.LayerID);
              let showDeleteButton = false,
                showAttachments = true,
                isEditable = false;

              if (layerInfo) {
                isEditable = layerInfo.IsEdit;
                showDeleteButton = layerInfo.IsDelete;
              }

              return {
                layer: layer,
                showDeleteButton,
                showAttachments,
                isEditable,
                // actions
              } as Popup.LayerInfo;
            }).toArray()
        });

        let basemapToggle = new BasemapToggle({ view, nextBasemap: 'osm' });
        view.ui.add(basemapToggle, 'bottom-left');
        basemapToggle.toggle();

        // opacity dữ liệu nền khi chuyển sang dữ liệu nền vệ tinh
        basemapToggle.on('toggle', this.onToggleBasemapToggle.bind(this));

        view.ui.add(new Locate({ view }), 'bottom-right');
      });
    }
  }

  private onToggleBasemapToggle({ current }: { current: __esri.Basemap, previous: __esri.Basemap }) {
    const view = this.props.view;
    if (view) {
      const basemapLayer = view.map.findLayerById(LAYER.BASE_MAP);
      basemapLayer.opacity = current.id === 'hybrid' ? 0.7 : 1;
    }
  }

  private registerEvent(_: __esri.MapView | __esri.SceneView) {
    return null;
  }

  render() {
    return (
      <div className="mapDiv">
        <div
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
        {this.props.view &&
          <Measure
            view={this.props.view as any}
          />
        }
      </div>
    );
  }
}

export default QuanLyMangLuoiComponent;
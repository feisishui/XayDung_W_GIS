// REACT
import * as React from 'react';
import BaseComponent, { BaseProps } from '../BaseComponent';
// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import SearchWidget = require('esri/widgets/Search');
import Locate = require('esri/widgets/Locate');
import BasemapToggle = require('esri/widgets/BasemapToggle');
import * as Popup from '../../map-lib/widgets/Popup';
import Action = require('esri/support/actions/ActionButton');
import { LAYER as CST_LAYER } from '../../constants/map.constant';

// APP
import LayerInfo from '../../services/map/models/LayerInfo';
import layerUtil from '../../map-lib/support/LayerHelper';
import { Model } from '../../services/map/SuCo/suco.model';

//REDUX
import { connect } from 'react-redux';
import { getThongTinChiTiet } from '../../services/map/map.action';

type DispatchToProps = {
  getThongTinChiTiet: (data: Model) => void
};

type Props = {
  view?: __esri.MapView | __esri.SceneView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[]
}
  & DispatchToProps
  & BaseProps;
type States = {
  isLoading: boolean
};

class MapComponent extends BaseComponent<Props, States> {
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
    if (this.mapDiv)
      this.props.loadMapDiv(this.mapDiv);
  }

  private initWidget(view: __esri.MapView | __esri.SceneView, layerInfos: LayerInfo[]) {
    if (view && layerInfos) {
      view.ui.move(['zoom'], 'bottom-right');
      // tìm kiếm
      var search = new SearchWidget({
        view: view,
        searchAllEnabled: false,
        sources: [
        ]
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

      new Popup.default({
        view,
        layerInfos: view.map.allLayers.filter(f => f.type === 'feature')
          .map(layer => {
            const layerInfo = layerInfos.find(info => layer.id === info.LayerID);
            let showDeleteButton = false,
              showAttachments = true,
              isEditable = false;
            let actions: Action[] = [];


            if (layer.id === CST_LAYER.DIEM_SU_CO) {
              actions.push(new Action({
                id: 'xemchitiet',
                title: 'Xem chi tiết',
                className: 'esri-icon-duplicate'
              }));
            }

            if (layerInfo) {
              // isEditable = layerInfo.IsEdit;
              // showDeleteButton = layerInfo.IsDelete;
            }

            return {
              layer: layer,
              showDeleteButton,
              showAttachments,
              isEditable,
              actions: actions as any
            } as Popup.LayerInfo;
          }).toArray()
      });

      let basemapToggle = new BasemapToggle({ view, nextBasemap: 'osm' })
      view.ui.add(basemapToggle, 'bottom-left');
      // view.when(()=>basemapToggle.toggle());

      view.ui.add(new Locate({ view }), 'bottom-right');
    }
  }

  private registerEvent(view: __esri.MapView | __esri.SceneView) {
    view.popup.on('trigger-action', this.triggerActionHandler.bind(this));
  }

  private async triggerActionHandler(event: {
    action: Action
  }) {
    const { view } = this.props;
    if (view) {
      try {
        this.setState({
          isLoading: true
        });
        const action = event.action,
          id = action.id;

        if (id === 'xemchitiet') {
          const selectedFeature = view.popup.selectedFeature;
          if (selectedFeature) {
            const attributes = selectedFeature.attributes as Model;
            this.props.getThongTinChiTiet(attributes);

          }
        }
      } catch (error) {
      }
      finally {
        this.setState({
          isLoading: false
        });
      }
    }
  }

  render() {
    const { className } = this.props;
    return (
      <div className="mapDiv">
      <div 
        ref={
          (element: HTMLDivElement) => this.mapDiv = element
        }
      >
      </div>
      </div>
    );
  }
}

export default connect(null, { getThongTinChiTiet })(MapComponent);
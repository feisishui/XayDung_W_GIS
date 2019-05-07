// REACT
import * as React from 'react';
import BasePage from './BasePage';

//Redux
import { getLayerInfos, initViewDiv } from '../actions/index'

// APP
import MapComponent from '../components/QuanLySuCo/MapComponent';
import InfoTableComponent from '../components/QuanLySuCo/InfoTableComponent';
import ToolComponent from '../components/QuanLySuCo/ToolComponent';
import ChiTietComponent from '../components/QuanLySuCo/ChiTiet/index';
import LayerInfo from '../services/map/models/LayerInfo';
import {
  LAYER
} from '../constants/map.constant';
import layerUtils from '../map-lib/support/LayerHelper';
// ESRI
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers';
import { alertActions } from '../services/main/main.action';
import { emptyInfos, setLayer } from '../services/map/SuCo/suco.action';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import FeatureLayer from '../map-lib/layers/FeatureLayer';
import SplitterLayout from 'react-splitter-layout';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    flex: '1 1 auto',
    height: 'calc(100vh - 64px)'
  },
  mapContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& .map-view-container': {
      flexGrow: 1,
      height: 'fit-content'
    },
    '& .info-container': {
      height: 200
    }
  }
});

type States = {
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView,
  isShowInfoTable: boolean
}

type DispatchToProps = {
  getLayerInfos: () => void,
  initViewDiv: (div: HTMLDivElement) => void,
  alertError: (message: string) => void,
  closeInfoWindow: () => void,
  setLayer: (layer: FeatureLayer) => void

};

type Props = {

}
  & DispatchToProps
  & StateToProps
  & WithStyles<typeof styles>;

class QLSCPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }
  }

  render() {
    const { isShowInfoTable, classes } = this.props;
    return (
      <div className={classes.root}>
        <SplitterLayout customClassName={classes.container} primaryIndex={1} secondaryInitialSize={340}>
          <ToolComponent />
            <SplitterLayout vertical customClassName={classes.mapContainer} primaryIndex={0} secondaryInitialSize={200}>
              <MapComponent
                loadMapDiv={this.loadMapDiv.bind(this)}
                layerInfos={this.props.layerInfos}
                view={this.props.view}
              />
              {
                isShowInfoTable
                &&
                <InfoTableComponent />
              }
            </SplitterLayout>
        </SplitterLayout>
        <ChiTietComponent />
      </div>
    );
  }

  private loadMapDiv(div: HTMLDivElement) {
    this.props.initViewDiv(div);
  }

  private initFL(layerInfos: LayerInfo[]) {
    try {
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      if (this.props.view) {
        this.props.view.map.addMany(layers);
        // set sự cố
        {
          const layerSuCo = this.props.view.map.findLayerById(LAYER.DIEM_SU_CO) as FeatureLayer;
          layerSuCo.renderer = layerUtils.getSuCoRenderer();
          layerSuCo.minScale = 0;
          this.props.setLayer(layerSuCo);
        }
      }
      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }

}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerInfos: state.map.layerInfos,
  view: state.map.view,
  isShowInfoTable: state.mapSuCo.infoDatas !== undefined,
});

export default connect(mapStateToProps, { getLayerInfos, initViewDiv, alertError: alertActions.error, closeInfoWindow: emptyInfos, setLayer })
  (withStyles(styles)(QLSCPage));
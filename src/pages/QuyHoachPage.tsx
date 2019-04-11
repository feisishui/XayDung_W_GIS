// REACT
import * as React from 'react';
import BasePage from './BasePage';

// Redux
import { initViewDiv, setDanhMucHoSo } from '../actions/index';

// Component
import { MapComponent, HeaderComponent as Header, ToolPaneComponent, DanhMucHoSoContainer, TraCuuContainer } from '../components/QuyHoach/index';
import SplitterLayout from 'react-splitter-layout';
import { createStyles, WithStyles, withStyles, LinearProgress} from '@material-ui/core';
import LayerInfo from '../services/map/models/LayerInfo';
import layerUtils from '../map-lib/support/LayerHelper';
import PopupComponent from '../components/material-ui/PopupComponent';
// ESRI
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers/index';


const styles = createStyles({
  root: { height: '100%', width: '100%' },

  container: {
    flex: '1 1 auto',
    height: 'calc(100vh - 64px)'
  },

});

type States = {
  isLoadLayers: boolean // kiểm tra đã tải lớp dữ liệu?
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView
};

type DispatchToProps = {
  initViewDiv: (div: HTMLDivElement) => void,
  closeDanhMucHoSo: () => void
};

type Props = {

} & DispatchToProps & StateToProps & WithStyles<typeof styles>;

class QuyHoachPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { isLoadLayers: false };
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }
  }

  render() {
    const { classes, view, layerInfos } = this.props;
    const { isLoadLayers } = this.state;

    return (
      <div className={classes.root}>
        <Header />

        <SplitterLayout customClassName={classes.container} primaryIndex={1} secondaryInitialSize={320}>
          <ToolPaneComponent />
          <MapComponent
            loadMapDiv={this.loadMapDiv.bind(this)}
            layerInfos={layerInfos}
            view={view}
          >
            <PopupComponent onClose={this.closeDanhMucHoSo}>
              <DanhMucHoSoContainer />
            </PopupComponent>

            <PopupComponent  style={{width:500,left:0}} title="Tra cứu đồ án quy hoạch" onClose={this.closeDanhMucHoSo}>
              <TraCuuContainer />
            </PopupComponent>

          </MapComponent>
          {!isLoadLayers && <LinearProgress />}
        </SplitterLayout>
      </div>
    );
  }

  private loadMapDiv(div: HTMLDivElement) {
    this.props.initViewDiv(div);
  }

  private initFL(layerInfos: LayerInfo[]) {
    try {
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      // mặc định không hiển thị trừ dữ liệu nền

      if (this.props.view) { this.props.view.map.addMany(layers); }
      this.setState({ isLoadLayers: true });
      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }

  private closeDanhMucHoSo() {
    this.props.closeDanhMucHoSo();
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerInfos: state.map.layerInfos,
  view: state.map.view
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  initViewDiv: (div: HTMLDivElement) => dispatch(initViewDiv(div)),
  closeDanhMucHoSo: () => dispatch(setDanhMucHoSo())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuyHoachPage));
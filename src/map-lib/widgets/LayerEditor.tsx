import * as React from 'react';
import { List, ListItem, Paper, LinearProgress, ListItemText, Avatar, Snackbar } from '@material-ui/core';

import ViewModel from './LayerEditor/LayerEditorViewModel';
import ListItemModel from './LayerEditor/ListItemModel';
import RenderingItemModel from './LayerEditor/RenderingItemModel';
import SnackbarContent from '../../components/material-ui/Snackbar';

import ListItemNested from '../../components/material-ui/ListItemNested';
import { Alert } from '../../services/main/main.model';
import MSG from '../../constants/MSG';

type States = {
  layers: ListItemModel[],
  isLoading: boolean,
  alert: Alert
};

type Props = {
  layers: __esri.FeatureLayer[],
  view: __esri.MapView | __esri.SceneView;
};

export default class LayerEditorComponent extends React.PureComponent<Props, States> {
  private viewModel: ViewModel;
  private rendering: RenderingItemModel;
  constructor(props: Props) {
    super(props);
    this.state = { layers: [], isLoading: false, alert: {} };
    this.viewModel = new ViewModel({
      view: props.view
    });

    this.viewModel.on('create-complete', this.createComplete.bind(this))
    this.viewModel.on('add-complete', this.addComplete.bind(this))

    this.rendering = new RenderingItemModel();
  }

  componentDidMount() {
    let allLayers = this.props.view.map.allLayers.filter(f => f.type === 'group').toArray(),
      layers = this.props.layers;
    let items = this.rendering.run(allLayers, layers);
    this.setState({ layers: items });
  }

  render() {
    const { isLoading, layers, alert } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={alert.message != undefined}
          autoHideDuration={alert.type && alert.type === 'error' ? undefined : 6000}
          onClose={this.handleSnackbarClose}
        >
          {alert.type &&
            <SnackbarContent
              onClose={this.handleSnackbarClose}
              variant={alert.type || 'info'}
              message={alert.message}
            />
          }
        </Snackbar>
        <Paper >
          {isLoading && <LinearProgress />}
          <List>
            {
              layers.length > 0 &&
              layers
                .sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
                .map(m => this.renderListView(m))
            }
          </List>
        </Paper>
      </React.Fragment>

    );
  }

  private renderListView(item: ListItemModel) {
    if (item.children.length > 0) {

      // nếu có sublayers
      let nestedItems = item.children
        .toArray()
        .sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
        .map(m =>
          this.renderListView(m)
        );

      return <ListItemNested
        key={item.id}
        nestedItems={nestedItems}
      >
        <Avatar><i className="esri-icon-layers"></i></Avatar>
        <ListItemText primary={item.title} />
      </ListItemNested>;
    } else {
      // const geometryIcon = featureLayer.geometryType === 'point' || featureLayer.geometryType === 'mulitpoint' ?
      //   'esri-icon-radio-checked' : featureLayer.geometryType === 'polyline' ? 'esri-icon-polyline' :
      //     featureLayer.geometryType === 'polygon' ? 'esri-icon-polygon' : 'esri-icon-question';
      return <ListItem
        button
        key={item.id}
        value={item.id}
        onClick={this.onClickDrawing.bind(this, item.layer as any)}
      // title={la.geometryType}
      // leftIcon={<i className={geometryIcon}></i>}
      >
        <ListItemText primary={item.title} />
      </ListItem>;
    }
  }

  private onClickDrawing(layer: __esri.FeatureLayer | undefined) {
    try {
      if (!layer) throw new Error('Không xác định được lớp dữ liệu');
      // nếu chưa đúng scale thì chỉnh lại scale
      if (this.props.view.scale > layer.minScale) { this.props.view.scale = layer.minScale; }
      this.viewModel.draw(layer as any);
      this.setState({ alert: { type: "info", message: 'Nhấn vào bản đồ...' } as Alert });
    } catch (error) {
      this.setState({ alert: { type: "error", message: error && error.message || MSG.CO_LOI_XAY_RA } as Alert });
    }

  }

  private createComplete() {
    this.setState({ isLoading: true });
  }
  private addComplete(event: any) {
    if (event.addFeatureResults) {
      let editResults = event.addFeatureResults as __esri.FeatureEditResult[];
      if (editResults.length > 0 && editResults[0].objectId) {
        this.setState({ isLoading: false, alert: { type: "success", message: MSG.THANH_CONG } as Alert });
      } else {
        this.setState({ isLoading: false, alert: { type: "error", message: MSG.CO_LOI_XAY_RA } as Alert });
      }
    } else {
      this.setState({ isLoading: false, alert: { type: "error", message: MSG.CO_LOI_XAY_RA } as Alert });
    }
  }

  private handleSnackbarClose = () => {
    this.setState({ alert: {} })
  };
}
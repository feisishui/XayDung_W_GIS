import * as React from 'react';
import { withStyles, createStyles, WithStyles, List, ListItem, Avatar, ListItemText, Tooltip } from '@material-ui/core';
import { Model, TinhTrang } from '../../../../services/map/SuCo/suco.model';
import { AllModelReducer } from '../../../../reducers';
import { connect } from 'react-redux';
import * as moment from 'moment/moment';
import { checkAppDonVi, getTinhTrangSCTT } from '../../../../services/map/SuCo/suco.helper';
import Auth from '../../../../modules/Auth';
const styles = createStyles({
  root: {

  },
  item: {
    cursor: 'pointer'
  }
});

type State = {
  reload: boolean
};

type StateToProps = {
  baseDatas: Model[],
  view?: __esri.MapView | __esri.SceneView,
  layer?: __esri.FeatureLayer // layer sự cố
};

type Props = {

}
  & StateToProps
  & WithStyles<typeof styles>;

class ListComponent extends React.Component<Props, State>{
  constructor(props:Props){
    super(props);
    this.state={reload:false};
  }
  render() {
    const { classes, baseDatas } = this.props;

    const datas = this.getDatas(baseDatas);

    return <div className={classes.root}>
      <List>
        {
          datas.map(m =>
            <Tooltip key={m.MaSuCo} title={m.MaSuCo} className={classes.item} onClick={() => this.onClick(m)}>
              <ListItem>
                <Avatar src={this.getSrcAvatar(m.TinhTrang, m.LinhVuc)}>
                </Avatar>
                <ListItemText primary={`${m.TGPhanAnh ? moment(new Date(m.TGPhanAnh)).fromNow() : '...'}`} secondary={m.DiaChi} />
              </ListItem>
            </Tooltip>
          )
        }
      </List>
    </div>;
  }

  private async onClick(model: Model) {
    const { OBJECTID } = model;
    const { view, layer } = this.props;
    if (view && layer) {
      const results = await layer.queryFeatures({
        where: `OBJECTID = ${OBJECTID}`,
        returnGeometry: true,
        outSpatialReference: view.spatialReference,
        outFields: ['*']
      });

      // hiển thị popup
      view.popup.open({
        features: results.features,
        updateLocationEnabled: true
      });
    }
  }

  private getSrcAvatar(tinhTrang: string, linhVuc: number = -1): string {
    const baseUrl = `/images/map/suco/`;
    return baseUrl + `${linhVuc}-${tinhTrang}.png`;
  }

  private getDatas(models: Model[]) {
    if (checkAppDonVi()) {
      const user = Auth.getUser();
      const maDonVi = user ? user.username.replace('qlsc_', '') : '';
      return models.filter(f => f.MaSCTTs && getTinhTrangSCTT(maDonVi, f.MaSCTTs) == TinhTrang.MoiTiepNhan);
    }
    return models.filter(f => f.TinhTrang == TinhTrang.MoiTiepNhan);
  }

  componentDidMount() {
    // load lại dữ liệu theo 10 giây để cập nhật lại thời gian phản ánh
    setInterval(() => {
      this.setState({reload:true});
    }, 10000);
  }
};

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  baseDatas: state.mapSuCo.items,
  view: state.map.view,
  layer: state.mapSuCo.layer
});

export default connect(mapStateToProps, null)(withStyles(styles)(ListComponent));
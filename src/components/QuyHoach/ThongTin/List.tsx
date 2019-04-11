import * as React from 'react';
import {
  createStyles,
  WithStyles, withStyles,
  List,
  ListSubheader,
  Theme,
  Typography
} from '@material-ui/core';
import ListItem from './ListItem';
import RanhGioiQuyHoach, { DM_RGQH_TrangThai, DoAnQuyHoach, DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { AllModelReducer } from '../../../reducers/index';
import { chonLoaiQuyHoach,chonDoAnQuyHoach } from '../../../actions/action';
import { connect } from 'react-redux';


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    '& i': {
      marginRight: 5
    }
  },
  hint: {
    textAlign: 'center'
  }
});

type StateToProps = {
  doAnQuyHoach: DoAnQuyHoach[],
  tenHanhChinh?: string,
  giaiDoan?: DM_RGQH_TrangThai,
}

type DispatchToProps = {
  chonLoaiQuyHoach: (loaiQuyHoach: DM_LoaiQuyHoach) => void,
  chonDoAnQuyHoach: (rgqh:RanhGioiQuyHoach) => void
};

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps
  & DispatchToProps;

type States = {

};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, doAnQuyHoach, tenHanhChinh, giaiDoan } = this.props;
    return <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          <Typography className={classes.title} color="primary" variant="h6">
            <i className="fas fa-globe-asia"></i>
            {tenHanhChinh}
          </Typography>
          Danh mục tra cứu {this.getGiaiDoan(giaiDoan)}
        </ListSubheader>}
      className={classes.root}
    >
      {
        doAnQuyHoach.length > 0
          ?
          doAnQuyHoach.map((m, index) =>
            <ListItem
              onClick={this.handleItemClick.bind(null, m)}
              onSubItemClick={this.handleSubItemClick}
              key={index}
              title={m.loaiQuyHoach}
              doAnQuyHoachs={m.doAns}
            />)
          : <Typography className={classes.hint}>Vui lòng chọn quy hoạch</Typography>
      }
    </List>;
  }

  getGiaiDoan = (giaiDoan?: DM_RGQH_TrangThai) => {
    if (!giaiDoan) return '';
    return giaiDoan === DM_RGQH_TrangThai["Thông tin"]
      ? 'Thông tin'
      : giaiDoan === DM_RGQH_TrangThai["Công bố"]
        ? 'Công bố'
        : giaiDoan === DM_RGQH_TrangThai["Lấy ý kiến"]
          ? 'Lấy ý kiến'
          : giaiDoan === DM_RGQH_TrangThai["Lữu trữ"]
            ? 'Lữu trữ' : ''
  }

  handleItemClick = async (doAnQuyHoach: DoAnQuyHoach): Promise<boolean> => {
    this.props.chonLoaiQuyHoach(doAnQuyHoach.loaiQuyHoach);
    return false;
  }
  handleSubItemClick = async (rgqh:RanhGioiQuyHoach) => {
    this.props.chonDoAnQuyHoach(rgqh);
    return false;
  }

}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  doAnQuyHoach: state.quyHoach.doAnQuyHoachs || [],
  tenHanhChinh: state.quyHoach.hanhChinhSelected && state.quyHoach.hanhChinhSelected.TenHuyenTP,
  giaiDoan: state.quyHoach.giaiDoan
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  chonLoaiQuyHoach: (loaiQuyHoach: DM_LoaiQuyHoach) => dispatch(chonLoaiQuyHoach({ loaiQuyHoach })),
  chonDoAnQuyHoach:(rgqh:RanhGioiQuyHoach)=>dispatch(chonDoAnQuyHoach({rgqh}))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Component));
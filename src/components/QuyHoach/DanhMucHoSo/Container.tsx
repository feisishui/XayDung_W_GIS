import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import { DanhMucHoSo, LoaiHoSo } from '../../../services/map/quy-hoach/models/danhmuchoso.model';
import { AllModelReducer } from '../../../reducers';
import { connect } from 'react-redux';
import List from './List';
const styles = (theme: Theme) => createStyles({
  root: {
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 20,
    height: 20,
    fontSize: '0.75rem'
  }
});

type StateToProps = {
  danhMucHoSos?: DanhMucHoSo[]
};

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps;

type States = {
  hoSoPhapLys: DanhMucHoSo[],
  banVes: DanhMucHoSo[],
  thuyetMinhs: DanhMucHoSo[]
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      hoSoPhapLys: [],
      banVes: [],
      thuyetMinhs: []
    };
  }
  render() {
    const { classes, danhMucHoSos } = this.props;

    if (!danhMucHoSos) {
      return null;
    }

    const { hoSoPhapLys, banVes, thuyetMinhs } = this.state;

    return <div className={classes.root}>
      <List title="I. Hồ sơ pháp lý" danhMucHoSos={hoSoPhapLys} />
      <List title="II. Bản vẽ" danhMucHoSos={banVes} />
      <List title="III. Thuyết minh" danhMucHoSos={thuyetMinhs} />
    </div>;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.danhMucHoSos != this.props.danhMucHoSos) {
      if (nextProps.danhMucHoSos) {
        this.setState({
          banVes: nextProps.danhMucHoSos.filter(f => f.LoaiHoSo === LoaiHoSo.BanVe),
          thuyetMinhs: nextProps.danhMucHoSos.filter(f => f.LoaiHoSo === LoaiHoSo.ThuyetMinh),
          hoSoPhapLys: nextProps.danhMucHoSos.filter(f => f.LoaiHoSo === LoaiHoSo.PhapLy)
        })
      } else {
        this.setState({
          banVes: [], thuyetMinhs: [], hoSoPhapLys: []
        })
      }
    }
  }
}

const dispatchStateToProps = (state: AllModelReducer): StateToProps => ({
  danhMucHoSos: state.quyHoach.danhMucHoSos
});

export default connect(dispatchStateToProps, null)(withStyles(styles)(Component));
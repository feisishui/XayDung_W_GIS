import * as React from 'react';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core';
import { DanhMucHoSo, LoaiDanhMuc } from '../../../services/map/quy-hoach/models/danhmuchoso.model';
import List from './DanhMucHoSo.List';
import AttachmentSelected from './DanhMucHoSo.AttachmentSelected';
import { AllModelReducer } from '../../../reducers';
import { connect } from 'react-redux';
import { chonHoSo } from '../../../actions/action';
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
  danhMucHoSos?: DanhMucHoSo[],
  hoSoSelected?: DanhMucHoSo
};

type DispatchToProps = {
  unHoSoSelect: () => void,
  chonHoSo: (hoSo: DanhMucHoSo) => void
};

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps
  & DispatchToProps;

type States = {
  hoSoPhapLys: DanhMucHoSo[],
  banVes: DanhMucHoSo[],
  thuyetMinhs: DanhMucHoSo[],
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

    const { hoSoSelected } = this.props;
    const { hoSoPhapLys, banVes, thuyetMinhs } = this.state;

    return <div className={classes.root}>
      <List title="I. Hồ sơ pháp lý" danhMucHoSos={hoSoPhapLys} chonHoSo={this.props.chonHoSo} />
      <List title="II. Bản vẽ" danhMucHoSos={banVes} chonHoSo={this.props.chonHoSo} />
      <List title="III. Thuyết minh" danhMucHoSos={thuyetMinhs} chonHoSo={this.props.chonHoSo} />
      {hoSoSelected &&
        <AttachmentSelected title={hoSoSelected.TenHoSo || ''} open={true} onClose={this.props.unHoSoSelect}>
          <iframe width="100%" height="100%" src={this.getUrl(hoSoSelected)} />
        </AttachmentSelected>}
    </div>;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.danhMucHoSos != this.props.danhMucHoSos) {
      if (nextProps.danhMucHoSos) {
        this.setState({
          banVes: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.BanVe),
          thuyetMinhs: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.ThuyetMinh),
          hoSoPhapLys: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.PhapLy)
        })
      } else {
        this.setState({
          banVes: [], thuyetMinhs: [], hoSoPhapLys: []
        })
      }
    }
  }

  getUrl = (hoSo: DanhMucHoSo) => {
    if (hoSo.ContentType && hoSo.ContentType === 'application/msword') {
      return `https://drive.google.com/viewerng/viewer?embedded=true&url=${hoSo.Url}`;
    }
    return hoSo.Url
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  danhMucHoSos: state.quyHoach.danhMucHoSos,
  hoSoSelected: state.quyHoach.danhMucHoSoSelected
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  unHoSoSelect: () => dispatch(chonHoSo()),
  chonHoSo: (hoSo: DanhMucHoSo) => dispatch(chonHoSo(hoSo))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Component));
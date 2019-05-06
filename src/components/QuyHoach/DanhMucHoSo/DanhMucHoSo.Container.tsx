import * as React from 'react';
import { createStyles, WithStyles, Theme, withStyles, Button } from '@material-ui/core';
import { DanhMucHoSo, LoaiDanhMuc } from '../../../services/map/quy-hoach/models/danhmuchoso.model';
import List from './DanhMucHoSo.List';
import AttachmentSelected from './DanhMucHoSo.AttachmentSelected';
import FormGopY from './GopY/DanhMucHoSo.FormGopY';
import PhieuGopY from './GopY/GopY.PhieuGopY';
import PhieuGopYDlg from './GopY/GopY.PhieuGopYDlg';
import { AllModelReducer } from '../../../reducers';
import { connect } from 'react-redux';
import { chonHoSo, capNhatNoiDungGopY, alertActions } from '../../../actions/action';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
const styles = (theme: Theme) => createStyles({
  root: {
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 20,
    height: 20,
    fontSize: '0.75rem'
  },
  attachmentSelected: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    '& iframe': {
      flexGrow: 1,
      border: 0
    },
    '& .formGopY': {
      height: 150
    }
  },
  btnXemPhieuGopY: {
    margin: 15,
    // display: 'flex',
    // justifyContent: 'flex-end'
  }
});

type StateToProps = {
  danhMucHoSos?: DanhMucHoSo[],
  hoSoSelected?: DanhMucHoSo,
  giaiDoan?: DM_RGQH_TrangThai,
};

type DispatchToProps = {
  unHoSoSelect: () => void,
  chonHoSo: (hoSo: DanhMucHoSo) => void,
  capNhatNoiDungGopY: (noiDung: string, hoSo: DanhMucHoSo) => void,
  error: (message: string) => void
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
  chuDauTus: DanhMucHoSo[],
  donViTuVans: DanhMucHoSo[],
  isHienThiPhieuGopY: boolean
};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      hoSoPhapLys: [],
      banVes: [],
      thuyetMinhs: [],
      chuDauTus: [],
      donViTuVans: [],
      isHienThiPhieuGopY: false
    };
  }
  render() {
    const { classes, danhMucHoSos } = this.props;

    if (!danhMucHoSos) {
      return null;
    }

    const { hoSoSelected, giaiDoan } = this.props;
    const { hoSoPhapLys, banVes, thuyetMinhs, chuDauTus, donViTuVans, isHienThiPhieuGopY } = this.state;

    return <div className={classes.root}>
      <List title="I. Hồ sơ pháp lý" danhMucHoSos={hoSoPhapLys} chonHoSo={this.props.chonHoSo} />
      <List title="II. Bản vẽ" danhMucHoSos={banVes} chonHoSo={this.props.chonHoSo} />
      <List title="III. Thuyết minh" danhMucHoSos={thuyetMinhs} chonHoSo={this.props.chonHoSo} />
      <List title="IV. Chủ đầu tư" danhMucHoSos={chuDauTus} chonHoSo={this.props.chonHoSo} />
      <List title="V. Đơn vị tư vấn" danhMucHoSos={donViTuVans} chonHoSo={this.props.chonHoSo} />
      {hoSoSelected &&
        <AttachmentSelected title={hoSoSelected.TenHoSo || ''} open={true} onClose={this.props.unHoSoSelect}>
          <div className={classes.attachmentSelected}>
            {hoSoSelected.ContentType && hoSoSelected.ContentType.startsWith('image')
              && <div style={{ width: '100%' }}><img src={this.getUrl(hoSoSelected)} style={{ width: '100%' }} alt={hoSoSelected.TenHoSo} /></div>}
            {hoSoSelected.ContentType && !hoSoSelected.ContentType.startsWith('image')
              && <iframe width="100%" src={this.getUrl(hoSoSelected)} />
            }
            {
              giaiDoan && giaiDoan === DM_RGQH_TrangThai["Lấy ý kiến"]
              && <div className="formGopY"> <FormGopY onSave={this.capNhatNoiDungGopY} /></div>
            }
          </div>
        </AttachmentSelected>}
      {giaiDoan && giaiDoan === DM_RGQH_TrangThai["Lấy ý kiến"]
        &&
        <div className={classes.btnXemPhieuGopY}>
          <Button fullWidth variant="contained" color="primary" onClick={() => this.setState({ isHienThiPhieuGopY: true })} >XEM PHIẾU GÓP Ý</Button>
        </div>
      }
      {isHienThiPhieuGopY &&
        <PhieuGopYDlg open={true} onClose={() => this.setState({ isHienThiPhieuGopY: false })}>
          <PhieuGopY />
        </PhieuGopYDlg>
      }
    </div>;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.danhMucHoSos) {
      this.setState({
        banVes: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.BanVe),
        thuyetMinhs: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.ThuyetMinh),
        hoSoPhapLys: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.PhapLy),
        chuDauTus: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.ChuDauTu),
        donViTuVans: nextProps.danhMucHoSos.filter(f => f.LoaiDanhMuc === LoaiDanhMuc.DonViTuVan)
      })
    } else {
      this.setState({
        banVes: [], thuyetMinhs: [], hoSoPhapLys: [], chuDauTus: [], donViTuVans: []
      })
    }
  }

  getUrl = (hoSo: DanhMucHoSo) => {
    if (hoSo.ContentType
      && (hoSo.ContentType === 'application/msword'
        || hoSo.ContentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${hoSo.Url}`;
    }
    return hoSo.Url
  }

  capNhatNoiDungGopY = (noiDung: string) => {
    if (this.props.hoSoSelected)
      this.props.capNhatNoiDungGopY(noiDung, this.props.hoSoSelected);
    else {
      this.props.error('Không xác định được hồ sơ đang được chọn, vui lòng thử lại thao tác chọn hồ sơ');
    }
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  danhMucHoSos: state.quyHoach.danhMucHoSos,
  hoSoSelected: state.quyHoach.danhMucHoSoSelected,
  giaiDoan: state.quyHoach.giaiDoan
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  unHoSoSelect: () => dispatch(chonHoSo()),
  chonHoSo: (hoSo: DanhMucHoSo) => dispatch(chonHoSo(hoSo)),
  capNhatNoiDungGopY: (noiDung: string, hoSo: DanhMucHoSo) => dispatch(capNhatNoiDungGopY(noiDung, hoSo)),
  error: (message: string) => dispatch(alertActions.error(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Component));
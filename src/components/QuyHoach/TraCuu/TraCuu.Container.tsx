import * as React from 'react';
import { createStyles, WithStyles, withStyles, LinearProgress, Divider, ListSubheader } from '@material-ui/core';
import Form from './TraCuu.Form';
import GroupButton from './TraCuu.GroupButton';
import KetQua from './TraCuu.KetQua';
import LocKetQua from './TraCuu.LocKetQua';
import { traCuuTheoDuAn, clickKetQuaTraCuuDuAn } from '../../../actions/action';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { connect } from 'react-redux';
const styles = createStyles({
  root: {},
  groupButton: {
    marginTop: 15,
    marginBottom: 15
  },
  ketQuaContainer: {
    maxHeight: 320,
    display: 'flex',
    flexDirection: 'column',
    '& .title': {

    },
    '& .searchText': {

    },
    '& .list': {
      flexGrow: 1,
      overflowY: 'auto'
    }
  }
});

interface RanhGioiQuyHoachCustomize extends RanhGioiQuyHoach {
  TenDuAnXoaDau?: string
}

type DispatchToProps = {
  clickKetQuaTraCuu: (doAn: RanhGioiQuyHoach) => void,
  traCuuTheoDuAn: (maHuyenTP?: string, maPhuongXa?: string, loaiQuyHoach?: DM_LoaiQuyHoach) => Promise<RanhGioiQuyHoach[]>
}

type Props = {

}
  & WithStyles<typeof styles>
  & DispatchToProps;

type States = {
  quanHuyen: string,
  phuongXa: string,
  loaiQuyHoach: string,
  ketQuaTraCuu?: RanhGioiQuyHoachCustomize[],
  ketQuaTraCuuFilter?: RanhGioiQuyHoach[],
  isLoading: boolean,
  searchText: string
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      quanHuyen: '', phuongXa: '', loaiQuyHoach: '', isLoading: false, searchText: ''
    };
  }
  render() {
    const { classes } = this.props;
    const { quanHuyen, phuongXa, loaiQuyHoach, ketQuaTraCuuFilter, isLoading, searchText } = this.state;
    return <div className={classes.root}>
      <Form quanHuyen={quanHuyen} phuongXa={phuongXa} loaiQuyHoach={loaiQuyHoach} onChange={this.handleChange} />
      <div className={classes.groupButton}>
        <GroupButton onClear={this.onClear} onSubmit={this.onSubmit} />
      </div>
      {isLoading && <LinearProgress />}
      {ketQuaTraCuuFilter &&
        <div className={classes.ketQuaContainer}>
          <Divider />
          <ListSubheader>Kết quả tra cứu</ListSubheader>
          <div className="searchText">
            <LocKetQua value={searchText} filter={this.handleFilter} />
          </div>
          <Divider />
          <div className="list">
            <KetQua doAns={ketQuaTraCuuFilter} onClick={this.handleClickKetQuaTraCuu} />
          </div>
        </div>
      }
    </div>;
  }

  onClear = () => {
    this.setState({ quanHuyen: '', phuongXa: '', loaiQuyHoach: '' });
  }

  onSubmit = async () => {
    try {
      this.setState({ isLoading: true });
      const kqtc = await this.props.traCuuTheoDuAn(this.state.quanHuyen, this.state.phuongXa, this.state.loaiQuyHoach as DM_LoaiQuyHoach);
      let ketQuaTraCuu = kqtc.map(m => ({ ...m, TenDuAnXoaDau: m.TenDuAn && xoaDau(m.TenDuAn) } as RanhGioiQuyHoachCustomize))

      this.setState({ ketQuaTraCuu, isLoading: false, ketQuaTraCuuFilter: [...kqtc] })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  handleChange = (name: string, value: string) => {
    //@ts-ignore
    this.setState({ [name]: value });
  }

  handleClickKetQuaTraCuu = (doAn: RanhGioiQuyHoach) => {
    this.props.clickKetQuaTraCuu(doAn);
  }

  handleFilter = (searchText: string) => {
    let ketQuaTraCuuFilter = this.state.ketQuaTraCuuFilter;
    if (this.state.ketQuaTraCuu) {
      let tmpSearchText = xoaDau(searchText);
      ketQuaTraCuuFilter = this.state.ketQuaTraCuu.filter(f => f.TenDuAnXoaDau && f.TenDuAnXoaDau.search(tmpSearchText) > -1);
    }
    this.setState({ ketQuaTraCuuFilter, searchText });
  }

}

function xoaDau(alias: string) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  clickKetQuaTraCuu: (doAn: RanhGioiQuyHoach) => dispatch(clickKetQuaTraCuuDuAn({ doAn })),
  traCuuTheoDuAn: (maHuyenTP?: string, maPhuongXa?: string, loaiQuyHoach?: DM_LoaiQuyHoach) => dispatch(traCuuTheoDuAn({ maHuyenTP, maPhuongXa, loaiQuyHoach }))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Component));
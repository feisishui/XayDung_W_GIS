import * as React from 'react';
import { createStyles, WithStyles, withStyles, ListSubheader, LinearProgress } from '@material-ui/core';
import Form from './TraCuu.Form';
import GroupButton from './TraCuu.GroupButton';
import KetQua from './TraCuu.KetQua';
import { traCuuTheoDuAn, clickKetQuaTraCuuDuAn } from '../../../actions/action';
import RanhGioiQuyHoach from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { connect } from 'react-redux';
const styles = createStyles({
  root: {},
  groupButton: {
    marginTop: 15
  },
  ketQuaContainer: {
    maxHeight: 320,
    overflowY: 'auto'
  }
});

type DispatchToProps = {
  clickKetQuaTraCuu: (doAn: RanhGioiQuyHoach) => void
}

type Props = {

}
  & WithStyles<typeof styles>
  & DispatchToProps;

type States = {
  quanHuyen: string,
  phuongXa: string,
  loaiQuyHoach: string,
  ketQuaTraCuu?: RanhGioiQuyHoach[],
  isLoading: boolean
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      quanHuyen: '', phuongXa: '', loaiQuyHoach: '', isLoading: false
    };
  }
  render() {
    const { classes } = this.props;
    const { quanHuyen, phuongXa, loaiQuyHoach, ketQuaTraCuu, isLoading } = this.state;
    return <div className={classes.root}>
      <Form quanHuyen={quanHuyen} phuongXa={phuongXa} loaiQuyHoach={loaiQuyHoach} onChange={this.handleChange} />
      <div className={classes.groupButton}>
        <GroupButton onClear={this.onClear} onSubmit={this.onSubmit} />
      </div>
      {isLoading && <LinearProgress />}
      {ketQuaTraCuu &&
        <div className={classes.ketQuaContainer}>
          <ListSubheader>Kết quả tra cứu</ListSubheader>
          <KetQua doAns={ketQuaTraCuu} onClick={this.handleClickKetQuaTraCuu} />
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
      const kqtc = await traCuuTheoDuAn({});
      this.setState({ ketQuaTraCuu: kqtc, isLoading: false })
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
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  clickKetQuaTraCuu: (doAn: RanhGioiQuyHoach) => dispatch(clickKetQuaTraCuuDuAn({ doAn }))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Component));
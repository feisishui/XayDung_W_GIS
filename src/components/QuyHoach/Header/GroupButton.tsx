import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import HeaderButton from './HeaderButton';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { chonGiaiDoan, chonHanhChinh, hienThiTraCuu } from '../../../services/map/map.action';
import { connect } from 'react-redux';
import HanhChinh from '../../../services/map/models/HanhChinh';
import { alertActions } from '../../../actions';
const styles = createStyles({
  root: {}
});

type DispatchToProps = {
  chonGiaiDoan: (giaiDoan: DM_RGQH_TrangThai) => void,
  chonHanhChinh: (hanhChinh: HanhChinh) => void,
  hienThiTraCuu: (mode: boolean) => void,
  luuTruQuyHoach: () => void
}

type Props = {

}
  & WithStyles<typeof styles>
  & DispatchToProps;

type States = {

};

class ButtonComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
      <Button onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])} onItemClick={this.handleButtonClick}>Thông tin quy hoạch</Button>
      <Button onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Lấy ý kiến"])} onItemClick={this.handleButtonClick}>Góp ý quy hoạch</Button>
      <Button onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Công bố"])} onItemClick={this.handleButtonClick}>Công bố quy hoạch</Button>
      <HeaderButton onClick={this.handleLuuTruClick} >Lưu trữ quy hoạch</HeaderButton>
      <HeaderButton onClick={this.handleTraCuuQuyHoachClick}>Tra cứu quy hoạch</HeaderButton>
    </div>;
  }

  handleButtonClick = (hanhChinh: HanhChinh) => {
    this.props.chonHanhChinh(hanhChinh);
  }

  handleClick = (giaiDoan: DM_RGQH_TrangThai) => {
    this.props.chonGiaiDoan(giaiDoan);
  }

  handleTraCuuQuyHoachClick = () => {
    this.props.hienThiTraCuu(true);
  }
  handleLuuTruClick = () => {
    this.props.luuTruQuyHoach();
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  chonGiaiDoan: (giaiDoan: DM_RGQH_TrangThai) => dispatch(chonGiaiDoan(giaiDoan)),
  chonHanhChinh: (hanhChinh: HanhChinh) => dispatch(chonHanhChinh(hanhChinh)),
  hienThiTraCuu: (mode: boolean) => dispatch(hienThiTraCuu(mode)),
  luuTruQuyHoach: () => dispatch(alertActions.info('Đang phát triển...'))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ButtonComponent));
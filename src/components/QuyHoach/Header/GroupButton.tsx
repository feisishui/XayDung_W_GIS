import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import TraCuuQuyHoachButton from './TraCuuQuyHoachButton';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { chonGiaiDoan, chonHanhChinh, hienThiTraCuu } from '../../../services/map/map.action';
import { connect } from 'react-redux';
import HanhChinh from '../../../services/map/models/HanhChinh';
const styles = createStyles({
  root: {}
});

type DispatchToProps = {
  chonGiaiDoan: (giaiDoan: DM_RGQH_TrangThai) => void,
  chonHanhChinh: (hanhChinh: HanhChinh) => void,
  hienThiTraCuu: (mode: boolean) => void
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
      <Button onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Lữu trữ"])} onItemClick={this.handleButtonClick}>Lưu trữ quy hoạch</Button>
      <TraCuuQuyHoachButton onClick={this.handleTraCuuQuyHoachClick}>Tra cứu quy hoạch</TraCuuQuyHoachButton>
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
}
export default connect(null, {
  chonHanhChinh,
  chonGiaiDoan,
  hienThiTraCuu
})(withStyles(styles)(ButtonComponent));
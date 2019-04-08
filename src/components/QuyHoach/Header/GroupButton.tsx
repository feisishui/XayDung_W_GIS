import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { chonGiaiDoan, chonHanhChinh } from '../../../services/map/map.action';
import { connect } from 'react-redux';
import HanhChinh from '../../../services/map/models/HanhChinh';
const styles = createStyles({
  root: {}
});

type DispatchToProps = {
  chonGiaiDoan: (giaiDoan: DM_RGQH_TrangThai) => void,
  chonHanhChinh: (hanhChinh: HanhChinh) => void
}

type Props = {

}
  & WithStyles<typeof styles>
  & DispatchToProps;

type States = {

};

class ButtonComponent extends React.Component<Props, States>{
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
      {/* <Button onItemClick={this.handleButtonClick}>Tra cứu quy hoạch</Button> */}
    </div>;
  }

  handleButtonClick = (hanhChinh: HanhChinh) => {
    this.props.chonHanhChinh(hanhChinh);
  }

  handleClick = (giaiDoan: DM_RGQH_TrangThai) => {
    this.props.chonGiaiDoan(giaiDoan);
  }
}
export default connect(null, {
  chonHanhChinh,
  chonGiaiDoan
})(withStyles(styles)(ButtonComponent));
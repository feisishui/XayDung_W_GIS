import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { chonHanhChinh } from '../../../services/map/map.action';
import { connect } from 'react-redux';
const styles = createStyles({
  root: {}
});

type DispatchToProps = {
  chonHanhChinh: (giaiDoan: DM_RGQH_TrangThai, id: string) => void
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
      <Button onItemClick={this.handleButtonClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}>Thông tin quy hoạch</Button>
      <Button onItemClick={this.handleButtonClick.bind(null, DM_RGQH_TrangThai["Lấy ý kiến"])}>Góp ý quy hoạch</Button>
      <Button onItemClick={this.handleButtonClick.bind(null, DM_RGQH_TrangThai["Công bố"])}>Công bố quy hoạch</Button>
      <Button onItemClick={this.handleButtonClick.bind(null, DM_RGQH_TrangThai["Công bố"])}>Lưu trữ quy hoạch</Button>
      {/* <Button onItemClick={this.handleButtonClick}>Tra cứu quy hoạch</Button> */}
    </div>;
  }

  handleButtonClick = (giaiDoan: DM_RGQH_TrangThai, maHuyenTP: string) => {
    this.props.chonHanhChinh(giaiDoan, maHuyenTP);
  }
}
export default connect(null, {
  chonHanhChinh
})(withStyles(styles)(ButtonComponent));
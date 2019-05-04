import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import HeaderButton from './HeaderButton';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { connect } from 'react-redux';
import HanhChinh from '../../../services/map/models/HanhChinh';
import { alertActions } from '../../../actions';


const styles = createStyles({
  root: {}
});

type DispatchToProps = {
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
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Thẩm định
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        onItemClick={this.handleButtonClick}
        values={[]}>
        Năng lực hoạt động xây dựng
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Cấp phép
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Sự cố công trình xây dựng
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Kiểm tra
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Tham mưu
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Phối hợp
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={[]}
        onItemClick={this.handleButtonClick}>
        Khác
      </Button>
    </div>;
  }

  handleButtonClick = () => {
  }

  handleClick = () => {
  }

}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ButtonComponent));
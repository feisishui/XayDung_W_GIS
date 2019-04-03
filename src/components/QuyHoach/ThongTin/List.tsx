import * as React from 'react';
import {
  createStyles,
  WithStyles, withStyles,
  List,
  ListSubheader,
  Theme,
  Typography
} from '@material-ui/core';
import ListItem from './ListItem';
import { DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { AllModelReducer } from '../../../reducers';
import { connect } from 'react-redux';


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    '& i': {
      marginRight: 5
    }
  }
});

type StateToProps = {
  loaiQuyHoachs: DM_LoaiQuyHoach[],
  tenHanhChinh?:string
}

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps;

type States = {

};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, loaiQuyHoachs ,tenHanhChinh} = this.props;
    return <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          <Typography className={classes.title} color="primary" variant="title">
            <i className="fas fa-globe-asia"></i>
            {tenHanhChinh}
          </Typography>
          Danh mục tra cứu thông tin quy hoạch
      </ListSubheader>}
      className={classes.root}
    >
      {
        loaiQuyHoachs.length > 0
        ?
        loaiQuyHoachs.map((m,index) => <ListItem key={index} title={m} />)
        : <Typography>Vui lòng chọn quy hoạch</Typography>
      }
    </List>;
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  loaiQuyHoachs: state.quyHoach.loaiQuyHoachs,
  tenHanhChinh:state.quyHoach.hanhChinhSelected && state.quyHoach.hanhChinhSelected.TenHuyenTP
});

export default connect(mapStateToProps, null)(withStyles(styles)(Component));
import * as React from 'react';
import { createStyles, WithStyles, withStyles, List, ListSubheader, ListItem, ListItemText, Avatar, Theme } from '@material-ui/core';
import { DanhMucHoSo, LoaiHoSo } from '../../../services/map/quy-hoach/models/danhmuchoso.model';
import { AllModelReducer } from '../../../reducers';
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
  danhMucHoSos?: DanhMucHoSo[]
};

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps;

type States = {
  hoSoPhapLys: DanhMucHoSo[],
  banVes: DanhMucHoSo[],
  thuyetMinhs: DanhMucHoSo[]
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

    return <div className={classes.root}>
      <List
        component="nav"
        subheader={<ListSubheader component="div">I. Hồ sơ pháp lý</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemText primary="Quyết định phê duyệt QHPK Phương An" />
        </ListItem>
      </List>
      <List
        component="nav"
        subheader={<ListSubheader component="div">II. Bản vẽ</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemText primary="Bản vẽ QHPK Phương An" />
        </ListItem>
      </List>
      <List
        component="nav"
        subheader={<ListSubheader component="div">III. Thuyết minh</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemText primary="Thuyết minh QHPK khu đô thị Phương An" />
        </ListItem>
      </List>
    </div>;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.danhMucHoSos != this.props.danhMucHoSos) {
      if (nextProps.danhMucHoSos) {
        this.setState({
          banVes:nextProps.danhMucHoSos.filter(f=>f.LoaiHoSo === LoaiHoSo.BanVe),
          thuyetMinhs:nextProps.danhMucHoSos.filter(f=>f.LoaiHoSo === LoaiHoSo.ThuyetMinh),
          hoSoPhapLys:nextProps.danhMucHoSos.filter(f=>f.LoaiHoSo === LoaiHoSo.PhapLy)
        })
      } else {
        this.setState({
          banVes: [], thuyetMinhs: [], hoSoPhapLys: []
        })
      }
    }
  }
}

const dispatchStateToProps = (state: AllModelReducer): StateToProps => ({
  danhMucHoSos: state.quyHoach.danhMucHoSos
});

export default withStyles(styles)(Component);
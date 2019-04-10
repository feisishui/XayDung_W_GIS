import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  Collapse,
  List,
  Theme,
  Badge,
  LinearProgress,
  ListItemIcon,
  Avatar
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = (theme: Theme) => createStyles({
  badge: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  item: {
    cursor: 'pointer',
    margin: 0,
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    cursor: 'pointer'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 20,
    height: 20,
    fontSize: '0.75rem'
  }
});

type Props = {
  title: string,
  doAnQuyHoachs: RanhGioiQuyHoach[],
  onClick: () => Promise<boolean>,
  onSubItemClick: (objectId: number) => void
}
  & WithStyles<typeof styles>;

type States = {
  open: boolean,
  isLoading: boolean
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      isLoading: false
    };
  }
  render() {
    const { classes, title, doAnQuyHoachs } = this.props;
    const { isLoading } = this.state;
    return <React.Fragment>
      {isLoading && <LinearProgress />}
      <ListItem button onClick={this.handleClick} className={classes.item}>
        <Badge badgeContent={doAnQuyHoachs.length} color="primary" className={classes.badge}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary={this.getName(title)} />
        </Badge>
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {doAnQuyHoachs.map((m, index) =>
            <ListItem key={index} button className={classes.nested} onClick={this.props.onSubItemClick.bind(null, m.OBJECTID as number)}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{index + 1}</Avatar>
              </ListItemIcon>
              <ListItemText primary={m.TenDuAn || 'Chưa có tên đồ án'} />
            </ListItem>
          )}
        </List>
      </Collapse>
    </React.Fragment>;
  }

  handleClick = async () => {
    try {
      this.setState({ isLoading: true });
      await this.props.onClick();
      this.setState(state => ({ open: !state.open, isLoading: false }));
    } catch (error) {
      this.setState({ isLoading: false })
    }
  };

  getName = (title: string) => {
    return title === DM_LoaiQuyHoach["Quy hoạch chi tiết"]
      ? 'Quy hoạch chi tiết'
      : title === DM_LoaiQuyHoach["Quy hoạch chung"]
        ? 'Quy hoạch chung'
        : title === DM_LoaiQuyHoach["Quy hoạch nông thôn mới"]
          ? 'Quy hoạch nông thôn mới'
          : title === DM_LoaiQuyHoach["Quy hoạch phân khu"]
            ? 'Quy hoạch phân khu' : 'N/A'
  }

}

export default withStyles(styles)(Component);
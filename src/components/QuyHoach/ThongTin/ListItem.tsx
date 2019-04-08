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
  LinearProgress
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
const styles = (theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

type Props = {
  title: string,
  doAnQuyHoachs: RanhGioiQuyHoach[],
  onClick: () => Promise<boolean>
}
  & WithStyles<typeof styles>;

type States = {
  open: boolean,
  isLoading: boolean
};

class Component extends React.Component<Props, States>{
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
      <ListItem button onClick={this.handleClick}>
        <Badge badgeContent={1} color="primary" className={classes.margin}>
          <ListItemText primary={this.getName(title)} />
        </Badge>
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {doAnQuyHoachs.map((m, index) =>
            <ListItem key={index} button className={classes.nested}>
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
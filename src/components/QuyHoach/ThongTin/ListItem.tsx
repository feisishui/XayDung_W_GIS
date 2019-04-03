import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  Avatar,
  Collapse,
  List,
  Theme,
  Badge
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { DM_LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
const styles = (theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

type Props = {
  title: string
}
  & WithStyles<typeof styles>;

type States = {
  open: boolean
};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    const { classes, title } = this.props;
    return <React.Fragment>
      <ListItem button onClick={this.handleClick}>
        <Badge badgeContent={1} color="primary" className={classes.margin}>
          <ListItemText primary={this.getName(title)} />
        </Badge>
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Quy hoạch phân khu xây dựng tỉ lệ 1/5000" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
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
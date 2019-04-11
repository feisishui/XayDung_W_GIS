import * as React from 'react';
import {
  createStyles,
  WithStyles, withStyles,
  List,
  ListItem, ListItemText, ListItemIcon, Avatar, Theme
} from '@material-ui/core';
import RanhGioiQuyHoach from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
const styles = (theme: Theme) => createStyles({
  root: {},
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 20,
    height: 20,
    fontSize: '0.75rem'
  },
});

type Props = {
  doAns: RanhGioiQuyHoach[],
  onClick: (doAn: RanhGioiQuyHoach) => void
}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, doAns } = this.props;
    return <div className={classes.root}>
      <List
        component="nav"
        className={classes.root}
      >
        {
          doAns.map((m, index) =>
            <ListItem button key={index} onClick={this.props.onClick.bind(null,m)}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{index + 1}</Avatar>
              </ListItemIcon>
              <ListItemText primary={m.TenDuAn || 'Chưa có tên đồ án'} />
            </ListItem>
          )
        }
      </List>
    </div>;
  }
}

export default withStyles(styles)(Component);
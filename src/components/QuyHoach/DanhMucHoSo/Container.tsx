import * as React from 'react';
import { createStyles, WithStyles, withStyles, List, ListSubheader, ListItem, ListItemText, Avatar, Theme } from '@material-ui/core';
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

type Props = {

}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
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
}

export default withStyles(styles)(Component);
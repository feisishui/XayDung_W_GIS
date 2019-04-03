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
  Theme
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = (theme: Theme) => createStyles({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

type Props = {
title:string
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
    const { classes,title } = this.props;
    return <React.Fragment>
      <ListItem button onClick={this.handleClick}>
        <ListItemText primary={title} ><Avatar>1</Avatar></ListItemText>
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

}

export default withStyles(styles)(Component);
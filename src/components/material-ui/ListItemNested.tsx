import * as React from 'react';
import {
  createStyles, WithStyles, withStyles, Theme,
  ListItem, Collapse, List,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = (theme: Theme) => createStyles({
  root: {},
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

type Props = {
  nestedItems: JSX.Element[]
}
  & WithStyles<typeof styles>;

type States = {
  isOpen: boolean
};

class ListItemNestedComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  render() {
    const { classes, nestedItems, children } = this.props;
    const { isOpen } = this.state;
    return <div className={classes.root}>
      <ListItem button onClick={this.handleClick.bind(this)}>
        {children}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nestedItems.map(m => m)}
        </List>
      </Collapse>
    </div>
  }

  private handleClick() {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }
}

export default withStyles(styles)(ListItemNestedComponent);
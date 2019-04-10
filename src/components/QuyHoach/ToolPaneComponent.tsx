import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import List from './ThongTin/List';
const styles = createStyles({
  root: {
    padding:'0 15px'
  }
});

type Props = {

}
  & WithStyles<typeof styles>;

type States = {

};

class ToolPaneComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
    <List/>
    </div>;
  }
}

export default withStyles(styles)(ToolPaneComponent);
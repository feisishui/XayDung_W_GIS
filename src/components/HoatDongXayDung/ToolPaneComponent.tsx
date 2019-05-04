import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
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
    </div>;
  }
}

export default withStyles(styles)(ToolPaneComponent);
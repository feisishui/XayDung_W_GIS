import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button } from '@material-ui/core';
const styles = createStyles({
  root: {
    display: 'flex',
    justifyContent:'flex-end',
    flexDirection: 'row',
    '& button': {
      margin: '0 15px'
    }
  }
});

type Props = {
onClear:()=>void,
onSubmit:()=>void
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
    const { classes } = this.props;
    return <div className={classes.root}>
      <Button variant="text" onClick={this.props.onClear}>Xóa trắng</Button>
      <Button variant="contained" color="primary" onClick={this.props.onSubmit}>Tìm</Button>
    </div>;
  }
}

export default withStyles(styles)(Component);
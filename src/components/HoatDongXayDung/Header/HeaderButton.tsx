import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button } from '@material-ui/core';
const styles = createStyles({
  root: {
    borderColor: '#fff',
    borderLeft: '#fff 1px solid',
    borderRadius: 0,
    display: 'inline-block'
  },
  button: {
    color: '#fff'
  }
});

type Props = {
  onClick: () => void
}
  & WithStyles<typeof styles>;

type States = {
};



class ButtonComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
      <Button
        className={classes.button}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Button>
    </div>
  }

  handleClick = (event: any) => {
    this.props.onClick();
  };

}


export default withStyles(styles)(ButtonComponent);
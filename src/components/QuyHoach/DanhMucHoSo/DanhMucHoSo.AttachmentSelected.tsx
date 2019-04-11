import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
const styles = createStyles({
  root: {},
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

type Props = {
  open: boolean,
  title: string,
  onClose: () => void
}
  & WithStyles<typeof styles>;

type States = {

};

function Transition(props:any) {
  return <Slide direction="up" {...props} />;
}


class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, open, title } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="textSecondary" className={classes.flex}>
                {title}
              </Typography>
              <IconButton onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Component);
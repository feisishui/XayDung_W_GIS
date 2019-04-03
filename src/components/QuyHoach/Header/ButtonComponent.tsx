import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button, Menu, MenuItem } from '@material-ui/core';
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

}
  & WithStyles<typeof styles>;

type States = {
  anchorEl: HTMLInputElement | null
};

const values = [
  'TP. Thủ Dầu Một',
  'Huyện Bến Cát',
  'Huyện Bắc Tân Uyên',
  'Huyện Tân Uyên',
  'Huyện Thuận An',
  'Huyện Dĩ An',
  'Huyện Phú Giáo',
  'Huyện Dầu Tiếng',
]

class ButtonComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return <div className={classes.root}>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        className={classes.button}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        {values.map((m, index) => <MenuItem key={index} onClick={this.handleClose}>{m}</MenuItem>)}
      </Menu>
    </div>
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}


export default withStyles(styles)(ButtonComponent);
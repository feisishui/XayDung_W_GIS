import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button,  MenuItem, Popover, MenuList, Theme } from '@material-ui/core';
import {LinhVucCongViec} from '../../../services/map/hoat-dong-xay-dung/models/hoatdongxaydung.model';
const styles = (theme: Theme) => createStyles({
  root: {
    borderColor: '#fff',
    borderLeft: '#fff 1px solid',
    borderRadius: 0,
    display: 'inline-block'
  },
  button: {
    color: '#fff'
  },
  popupOver: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  }
});

type Props = {
  onItemClick: () => void,
  onClick: () => void,
  values:LinhVucCongViec[]
}
  & WithStyles<typeof styles>;

type States = {
  anchorEl: HTMLInputElement | null
};



class ButtonComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  render() {
    const { classes,values } = this.props;
    const { anchorEl } = this.state;
    return <div className={classes.root}>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        className={classes.button}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Button>
      <Popover
        id="simple-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuList>
          {values.map((m, index) =>
            <MenuItem
              style={{ width: 200 }}
              dense
              key={index}
              onClick={this.handleItemClick.bind(null, m)}>
              {m.CongViec}
            </MenuItem>)
          }
        </MenuList>
      </Popover>
    </div>
  }

  handleClick = (event: any) => {
    this.props.onClick();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleItemClick = () => {
    // this.props.onItemClick(hanhChinh);
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}


export default withStyles(styles)(ButtonComponent);
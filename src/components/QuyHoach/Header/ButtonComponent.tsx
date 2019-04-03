import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import HanhChinh from '../../../services/map/models/HanhChinh';
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
  onItemClick: (hanhChinh:HanhChinh) => void
}
  & WithStyles<typeof styles>;

type States = {
  anchorEl: HTMLInputElement | null
};

const values: HanhChinh[] = [
  {
    TenHuyenTP: 'Bàu Bàng',
    MaHuyenTP: '726'
  },
  {
    TenHuyenTP: 'Dầu Tiếng',
    MaHuyenTP: '720'
  },
  {
    TenHuyenTP: 'Dĩ An',
    MaHuyenTP: '724'
  },
  {
    TenHuyenTP: 'Phú Giáo',
    MaHuyenTP: '722'
  },
  {
    TenHuyenTP: 'TP Bắc Tân Uyên',
    MaHuyenTP: '727'
  },
  {
    TenHuyenTP: 'TP Thủ Dầu Một',
    MaHuyenTP: '718'
  },
  {
    TenHuyenTP: 'Thuận An',
    MaHuyenTP: '725'
  },
  {
    TenHuyenTP: 'Tân Uyên',
    MaHuyenTP: '723'
  },
  {
    TenHuyenTP: 'Bến Cát',
    MaHuyenTP: '721'
  }
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
        {values.map((m, index) =>
          <MenuItem
            key={index}
            onClick={this.handleItemClick.bind(null, m)}>
            {m.TenHuyenTP}
          </MenuItem>)}
      </Menu>
    </div>
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleItemClick = (hanhChinh:HanhChinh) => {
    this.props.onItemClick(hanhChinh);
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}


export default withStyles(styles)(ButtonComponent);
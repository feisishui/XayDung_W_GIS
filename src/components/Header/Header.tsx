import * as React from 'react';
import {
  AppBar, Toolbar, IconButton,
  Typography, Menu, MenuItem,
  WithStyles, withStyles, ListItemText, createStyles,

} from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import routes from '../../modules/routers';
import { AllModelReducer } from '../../reducers/index';
import { connect } from 'react-redux';


type StateToProps = {
  displayName: string,
};

type DispatchToProps = {
};

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  displayName: {
    marginRight: 5
  }
});

type Props = {
} & RouteComponentProps<null> & DispatchToProps & StateToProps
  & WithStyles<typeof styles>;

type States = {
  anchorEl?: HTMLElement
};

class Header extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  private getTitle(): string {
    let title = '';
    const { location } = this.props;
    var route = routes.find(f => f.props.path.startsWith(location.pathname));
    if (route) {
      title = route.name;
    }
    return title;
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  render() {
    const { displayName, classes } = this.props;
    const { anchorEl } = this.state;
    const title = this.getTitle();
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            // onClick={this.toggleDrawer(true)}
            >
              <Link to="/" style={{ color: '#fff' }}>
                <MenuIcon />
              </Link>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              {title}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Typography
                  className={classes.displayName}
                  variant="button"
                  color="inherit"
                  noWrap
                >
                  {displayName}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemText>Đổi mật khẩu</ListItemText>
                </MenuItem>
                <Link to="/logout">
                  <MenuItem><ListItemText>Đăng xuất</ListItemText></MenuItem>
                </Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  displayName: state.main.user ? state.main.user.displayname : ''
});

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(Header)));

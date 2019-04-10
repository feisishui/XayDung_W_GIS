import * as React from 'react';
import {
  AppBar, Toolbar, IconButton,
  Typography, 
  WithStyles, withStyles, Drawer, ListItem, ListItemText, Divider, createStyles,

} from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import routes from '../../modules/routers';
import { AllModelReducer } from '../../reducers/index';
import { connect } from 'react-redux';
import version from '../../modules/version';
import GroupButton from './Header/GroupButton';

const MyDrawer = (props: { isOpenDrawer: boolean, onClose: () => void }) => (
  <Drawer open={props.isOpenDrawer} onClose={props.onClose}>
    <div
      tabIndex={0}
      role="button"
      onClick={props.onClose}
      onKeyDown={props.onClose}
    >
      {routes.map(m => (
        <Link key={m.id} to={m.props.path}>
          <ListItem button>
            <ListItemText primary={m.name} />
          </ListItem>
        </Link>
      ))}
      <Divider />
      <Typography variant="subtitle1">
        Phiên bản: {version.getVersion()}
      </Typography>
    </div>
  </Drawer>
);

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
  isOpenDrawer: boolean,
  anchorEl?: HTMLElement
};

class Header extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenDrawer: false
    };
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      isOpenDrawer: open
    });
  };

  render() {
    const { displayName, classes } = this.props;
    const { anchorEl, isOpenDrawer } = this.state;
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
            
            <GroupButton/>

          </Toolbar>
        </AppBar>
        <MyDrawer isOpenDrawer={isOpenDrawer} onClose={this.toggleDrawer(false)} />
      </div>
    );
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  displayName: state.main.user ? state.main.user.displayname : ''
});

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(Header)));

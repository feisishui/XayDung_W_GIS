import * as React from 'react';
import {
  AppBar, Toolbar, IconButton,
  WithStyles, withStyles, createStyles,

} from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
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
};

class Header extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {  classes } = this.props;
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
            
          {this.props.children}

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

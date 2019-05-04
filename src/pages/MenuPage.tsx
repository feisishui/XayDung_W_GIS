import * as React from 'react';
import {
  createStyles, withStyles, WithStyles, Theme, Typography
}
  from '@material-ui/core';
import MetriItemComponent from '../components/MenuPage/MetroItem';
import FooterComponent from '../components/MenuPage/Footer';
import routes, { Route } from '../modules/routers';
import authService from '../services/api/AuthServices';
import { alertActions, loading } from '../actions/action';
import { connect } from 'react-redux';
import MSG from '../constants/MSG';
import BasePage, { PageProps } from './BasePage';
import Auth from '../modules/Auth';
import versionManager from '../modules/version';

const COLORS = ['#b33939', '#218c74', '#33d9b2', '#ff793f', '#f1c40f', '#8e44ad', '#f39c12', '#3498db']

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    background: 'url(images/background.jpg) no-repeat center center fixed',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    width: '100%',
    minHeight: '100vh'
  },
  versionContainer: {
    textAlign: 'center',
    color: '#fff'
  },
  titleContainer: {
    textAlign: 'center',
    padding: 10
  },
  logo: {
    width: 100, height: 100
  },
  title: {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 700,
    textShadow: '2px 2px #9E9E9E',
    color: '#fff'
  },
  titleMain: {
    // color: theme.palette.primary.main,
    fontSize: 35
  },
  titleSub: {
    // color: theme.palette.secondary.main,
    fontSize: 30,
  },
  metroContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& a': {
      textDecoration: 'none'
    }
  },

});

type States = {
  routes: Route[]
};

type DispatchToProps = {
  alert: (message: string) => void,
  loading: (show: boolean) => void
};

type Props = {

}
  & DispatchToProps
  & WithStyles<typeof styles>
  & PageProps;
class MenuPage extends BasePage<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { routes: [] };
  }

  async componentDidMount() {
    // lấy quyền để hiển thị chức năng
    try {
      var _routes: Route[] = [];
      if (!Auth.isUserAuthenticated()) {
        _routes = routes.filter(f => !f.isPrivate);
      } else {


        this.props.loading(true);
        const profile = await authService.profile();
        profile.Capabilities
          .forEach(m => {
            var r = routes.find(f => f.id === m.replace('w_', ''));
            if (r) {
              _routes.push(r);
            }
          });
      }
      this.setState({ routes: _routes });
    } catch (error) {
      this.props.alert(error || MSG.CO_LOI_XAY_RA);
    } finally {
      this.props.loading(false);
    }
  }

  private randomColor() {
    const index = Math.floor(Math.random() * (COLORS.length - 1));
    return COLORS[index];
  }

  render() {
    const { classes } = this.props;
    const { routes } = this.state;

    return <div className={classes.root}>
      <div className={classes.titleContainer}>
        <img
          className={classes.logo}
          src="/images/logo.png" alt="Logo" />
        <div className={classes.title}>
          <div className={classes.titleMain}>Sở Xây Dựng Bình Dương</div>
          <div className={classes.titleSub}>
            <p>
              Xây dựng hệ thống thông tin địa lý
              và
              các phần mềm chuyên ngành xây dựng giai đoạn 2
            </p>
          </div>
        </div>
      </div>
      <div className={classes.versionContainer}>
        <Typography color="inherit">v{versionManager.getVersion()}</Typography>
      </div>
      <div className={classes.metroContainer}>
        {
          routes.map(m =>
            <MetriItemComponent key={m.id} title={m.name} icon={m.avatar} path={m.props.path} backgroundColor={this.randomColor()} />
          )
        }

        {!Auth.isUserAuthenticated() &&
          <MetriItemComponent title="Đăng nhập" icon="/images/icons/login.png" path="/login" backgroundColor={this.randomColor()} />
        }
        {
          Auth.isUserAuthenticated() &&
          <MetriItemComponent title="Đăng xuất" icon="/images/icons/logout.png" path="/logout" backgroundColor={this.randomColor()} />
        }
      </div>
      <FooterComponent/>
    </div>
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  alert: (message: string) => dispatch(alertActions.error(message)),
  loading: (show: boolean) => show ? dispatch(loading.loadingReady()) : dispatch(loading.loadingFinish())
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(MenuPage));
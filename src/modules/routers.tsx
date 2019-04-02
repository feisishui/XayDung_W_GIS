import { QuyHoachPage } from '../pages';
import { APP } from '../constants';
export interface Route {
  id: string; name: string; component: any;
  props: { math?: boolean, exact?: boolean, path: string };
  avatar: string;
  isPrivate: boolean
}

const routes: Array<Route> = [
  {
    id: 'qh', name: 'Quy hoạch', component: QuyHoachPage,
    props: { exact: true, path: '/' + APP.QuyHoach },
    avatar: '/images/icons/qlkd.png',
    isPrivate: false
  },
];
export default routes;
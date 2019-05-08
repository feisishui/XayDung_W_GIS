import {
  QuyHoachPage,
  HoatDongXayDungPage,
  XemDuLieuPage,
  QLSCPage,
  TNSCPage,
  HaTangKyThuatPage
} from '../pages/index';
import { APPLICATION } from '../constants/index';
export interface Route {
  id: string; name: string; component: any;
  props: { math?: boolean, exact?: boolean, path: string };
  avatar: string;
  isPrivate: boolean
}

const routes: Array<Route> = [
  {
    id: APPLICATION.ThongTinQuyHoach, name: 'Quy hoạch', component: QuyHoachPage,
    props: { exact: true, path: '/' + APPLICATION.ThongTinQuyHoach },
    avatar: '/images/icons/ttqh.png',
    isPrivate: false
  },
  {
    id: APPLICATION.HoatDongXayDung, name: 'Quản lý hoạt động xây dựng', component: HoatDongXayDungPage,
    props: { exact: true, path: '/' + APPLICATION.HoatDongXayDung },
    avatar: '/images/icons/hdxd.png',
    isPrivate: true
  },
  {
    id: APPLICATION.XemDuLieu, name: 'Xem dữ liệu hạ tầng kỹ thuật', component: XemDuLieuPage,
    props: { exact: true, path: '/'+APPLICATION.XemDuLieu },
    avatar: '/images/icons/qlhtkt.png',isPrivate:false
  },
  {
    id: APPLICATION.QuanLySuCo, name: 'Quản lý sự cố', component: QLSCPage,
    props: { path: '/' + APPLICATION.QuanLySuCo },
    avatar: '/images/icons/qlsc.png',isPrivate:true
  },
  {
    id: APPLICATION.QuanLySuCoDonVi, name: 'Quản lý sự cố', component: QLSCPage,
    props: { path: '/' + APPLICATION.QuanLySuCoDonVi },
    avatar: '/images/icons/qlsc.png',isPrivate:true
  },
  {
    id: APPLICATION.TiepNhanSuCo, name: 'Tiếp nhận sự cố', component: TNSCPage,
    props: { path: '/' + APPLICATION.TiepNhanSuCo },
    avatar: '/images/icons/tnsc.png',isPrivate:false
  },
  {
    id: APPLICATION.QuanLyHaTangKyThuat, name: 'Quản lý hạ tầng kỹ thuật', component: HaTangKyThuatPage,
    props: { path: '/' + APPLICATION.QuanLyHaTangKyThuat },
    avatar: '/images/icons/qlhtkt.png',isPrivate:true
  },
];
export default routes;
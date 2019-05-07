import RanhGioiQuyHoach, { DM_LoaiQuyHoach, DM_RGQH_TrangThai, DoAnQuyHoach } from './models/ranhgioiquyhoach.model';
import HanhChinh from '../models/HanhChinh';
import {CongViec, LinhVuc} from './models/hoatdongxaydung.model';


export type Model = {
  loaiCongViecSelected?:CongViec,
  linhVucSelected?:LinhVuc,
  hoSoSelected?:any,
  lstHoSo?:any[]
};

export const defaultState: Model = {
};

function reducer(state: Model = defaultState, action: QuyHoachAction): Model {
  switch (action.type) {

    default:
      return state;
  }
}

export default reducer;
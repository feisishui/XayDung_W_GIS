import { alertActions, loading } from '../../main/main.action';
import { DM_RGQH_TrangThai } from './models/ranhgioiquyhoach.model';
import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { Dispatch } from 'redux';
import HanhChinh from '../models/HanhChinh';


export const ThongTinQuyHoach = {
  chonHanhChinh: (hanhChinh: HanhChinh) => chonHanhChinh(DM_RGQH_TrangThai["Thông tin"], hanhChinh)
}

/**
 * Action chọn hành chính
 * @param giaiDoan Giai đoạn quy hoạch
 * @param hanhChinh Mã hành chính
 */
export const chonHanhChinh = (giaiDoan: DM_RGQH_TrangThai, hanhChinh: HanhChinh) => {
  return (dispatch: Dispatch<QuyHoachAction>) => {
    switch (giaiDoan) {
      case DM_RGQH_TrangThai["Thông tin"]:
        dispatch({
          type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh,
          hanhChinh
        });
        break;

      default:
        break;
    }
  }
}
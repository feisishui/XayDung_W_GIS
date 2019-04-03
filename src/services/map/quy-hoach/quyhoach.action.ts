import { alertActions, loading } from '../../main/main.action';
import { DM_RGQH_TrangThai } from './models/ranhgioiquyhoach.model';
import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { Dispatch } from 'redux';


export const ThongTinQuyHoach = {
  chonHanhChinh: (hanhChinh: string) => chonHanhChinh(DM_RGQH_TrangThai["Thông tin"], hanhChinh)
}

/**
 * Action chọn hành chính
 * @param giaiDoan Giai đoạn quy hoạch
 * @param hanhChinh Mã hành chính
 */
export const chonHanhChinh = (giaiDoan: DM_RGQH_TrangThai, hanhChinh: string) => {
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
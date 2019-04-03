import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { DM_LoaiQuyHoach } from './models/ranhgioiquyhoach.model';

export type Model = {
  loaiQuyHoachs: DM_LoaiQuyHoach[]
};

export const defaultState: Model = {
  loaiQuyHoachs: []
};

function reducer(state: Model = defaultState, action: QuyHoachAction): Model {
  switch (action.type) {
    case QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh:
      let loaiQuyHoachs: DM_LoaiQuyHoach[] = [
        DM_LoaiQuyHoach["Quy hoạch chung"],
        DM_LoaiQuyHoach["Quy hoạch phân khu"],
        DM_LoaiQuyHoach["Quy hoạch chi tiết"]
      ]
      if (action.hanhChinh !== '727' && action.hanhChinh !== '718') {
        loaiQuyHoachs.push(DM_LoaiQuyHoach["Quy hoạch nông thôn mới"]);
      }
      return { ...state, loaiQuyHoachs }
    default:
      return state;
  }
}

export default reducer;
import { QuyHoachActionType } from './quyhoach.action-types';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach, DM_RGQH_TrangThai } from './models/ranhgioiquyhoach.model';
import HanhChinh from '../models/HanhChinh';
export type QuyHoachAction =
  { type: QuyHoachActionType.ChonGiaiDoan, giaiDoan: DM_RGQH_TrangThai }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh, hanhChinh: HanhChinh }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach, hanhChinh: HanhChinh, loaiQuyHoach: DM_LoaiQuyHoach }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach_SUCCESS, hanhChinh: HanhChinh, loaiQuyHoach: DM_LoaiQuyHoach, quyHoachs: RanhGioiQuyHoach[] }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach, objectId: number }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach, objectId: number }

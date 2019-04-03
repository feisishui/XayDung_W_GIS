import { QuyHoachActionType } from './quyhoach.action-types';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach } from './models/ranhgioiquyhoach.model';
export type QuyHoachAction =
  { type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh, hanhChinh: string }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach, hanhChinh: string, loaiQuyHoach: DM_LoaiQuyHoach }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach, objectId: number }

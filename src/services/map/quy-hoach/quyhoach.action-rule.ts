import { QuyHoachActionType } from './quyhoach.action-types';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach } from './models/ranhgioiquyhoach.model';
import HanhChinh from '../models/HanhChinh';
export type QuyHoachAction =
  { type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh, hanhChinh: HanhChinh }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach, hanhChinh: HanhChinh, loaiQuyHoach: DM_LoaiQuyHoach }
  | { type: QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach, objectId: number }

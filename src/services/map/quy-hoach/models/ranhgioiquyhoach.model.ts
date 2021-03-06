export const RanhGioiQuyHoachName = {
  MaQuanHuyen: 'MaQuanHuyen',
  MaPhuongXa: 'MaPhuongXa',
  LoaiQuyHoach: 'LoaiQuyHoach',
  TenDuAn: 'TenDuAn',
  MaDuAn: 'MaDuAn',
  TrangThai: 'TrangThai'
}

export interface DoAnQuyHoach {
  loaiQuyHoach: DM_LoaiQuyHoach,
  doAns: RanhGioiQuyHoach[]
}

export const LoaiQuyHoach = [
  { code: 'QHC', value: 'Quy hoạch chung' },
  { code: 'QHPK', value: 'Quy hoạch phân khu' },
  { code: 'QHNTM', value: 'Quy hoạch nông thôn mới' },
  { code: 'QHCT', value: 'Quy hoạch chi tiết' } 
]

export default interface RanhGioiQuyHoach {
  OBJECTID?: number;
  MaQuanHuyen?: string;
  MaPhuongXa?: string;
  MaDuAn?: string;
  LoaiQuyHoach?: DM_LoaiQuyHoach;
  TenDuAn?: string;
  TrangThai?: DM_RGQH_TrangThai;
}

export enum DM_LoaiQuyHoach {
  'Quy hoạch chung' = 'QHC',
  'Quy hoạch phân khu' = 'QHPK',
  'Quy hoạch nông thôn mới' = 'QHNTM',
  'Quy hoạch chi tiết' = 'QHCT'
}

export enum DM_RGQH_TrangThai {
  'Thông tin' = 1,
  'Lấy ý kiến',
  'Công bố',
  'Lữu trữ'
}
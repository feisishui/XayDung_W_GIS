export default interface RanhGioiQuyHoach {
  MaQuanHuyen?: string;
  MaPhuongXa?: string;
  LoaiQuyHoach?: DM_LoaiQuyHoach;
  TenQuyHoach?: string;
  TrangThai: DM_RGQH_TrangThai;
}

export enum DM_LoaiQuyHoach {
  'Quy hoạch chung' = 'QHC',
  'Quy hoạch phân khu' = 'QHPK',
  'Quy hoạch nông thôn mới' = 'QHNTM',
  'Quy hoạch chi tiết' = 'QHCT'
}

export interface LoaiQuyHoach extends __esri.CodedValueDomainCodedValues {
  
} 

export enum DM_RGQH_TrangThai {
  'Thông tin' = 1,
  'Lấy ý kiến',
  'Công bố',
  'Lữu trữ'
}
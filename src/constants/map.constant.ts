import { APPLICATION } from './core.constant';
export const BASEMAP = {
  INDEX_HANH_CHINH: 13,
  MaHuyenTP: 'MaHuyenTP',
  MaPhuongXa: 'MaPhuongXa',
  MaDuong: 'MaDuong'
};

export const SERVICE_PRINT =
  'https://ditagis.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

export const LAYER = {
  BASE_MAP: 'basemap',
  RanhGioiQuyHoach: 'ranhgioiquyhoachLYR',
  DIEM_SU_CO:'diemsucoLYR'
};
export const MAP = {
  CENTER: [106.701767,11.132015],
  ZOOM: 10,
  SCALE: 500000
};

export const APP_LAYER = {
  [APPLICATION.ThongTinQuyHoach]: ['*'],
  [APPLICATION.XemDuLieu]: ['*'],
  [APPLICATION.QuanLySuCo]: ['*'],
  [APPLICATION.QuanLySuCoDonVi]: ['*'],
  [APPLICATION.TiepNhanSuCo]: [LAYER.DIEM_SU_CO, LAYER.BASE_MAP]
};

export const FIELDS_NO_EDIT = [
  'MaPhuongXa',
  'SHAPE_Length',
  'MaHuyenTP',
  'MaXa',
  'OBJECTID',
  'MaDMA',
  'GlobalID',
  'DoiQuanLy',
  'TGPhanAnh',
  'created_user',
  'created_date',
  'last_edited_user',
  'last_edited_date'
];
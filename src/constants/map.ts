import { APP } from '.';

export const BASEMAP = {
  INDEX_HANH_CHINH: 5,
  MaHuyenTP: 'MaHuyenTP',
  MaPhuongXa: 'MaPhuongXa',
  MaDuong: 'MaDuong'
};

export const SERVICE_PRINT =
  'https://ditagis.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

export const LAYER = {
  BASE_MAP: 'basemap',
};
export const MAP = {
  CENTER: [106.477017,11.3254024],
  ZOOM: 10
};

export const APP_LAYER = {
  [APP.QuyHoach]: ['*'],
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
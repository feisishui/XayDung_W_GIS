export interface DanhMucHoSo {
  ID?: number;
  TenTen?: string;
  TenHoSo?: string;
  LoaiHoSo?: number;
}

export enum LoaiHoSo{
  PhapLy=1,BanVe,ThuyetMinh
}
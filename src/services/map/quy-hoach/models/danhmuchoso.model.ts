export interface DanhMucHoSo {
  ID?: number;
  TenTep?: string;
  TenHoSo?: string;
  LoaiHoSo?: number;
}

export enum LoaiHoSo{
  PhapLy=1,BanVe,ThuyetMinh
}
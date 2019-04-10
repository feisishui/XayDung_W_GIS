export interface DanhMucHoSo {
  ID?: number;
  TenTep?: string;
  TenHoSo?: string;
  LoaiDanhMuc?: number;
  Url?:string;
  ContentType?:string;
}

export enum LoaiDanhMuc{
  PhapLy=1,BanVe,ThuyetMinh
}
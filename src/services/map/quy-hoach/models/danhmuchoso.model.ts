export interface DanhMucHoSo {
  ID?: number;
  TenTep?: string;
  TenHoSo?: string;
  LoaiDanhMuc?: number;
  Url?:string;
  ContentType?:string;
}

export enum LoaiDanhMuc{
  PhapLy=1,BanVe,ThuyetMinh,ChuDauTu,DonViTuVan
}

export interface NoiDungGopY{
  hoSo:DanhMucHoSo,
  noiDung:string
}

export interface ChuDauTu{
  TenCDT?:string;
  MaCDT?:string;
  Attachment?:__esri.AttachmentInfo
}
export default interface SuCoThongTin {
  OBJECTID: number | null;
  MaDonVi: string | null;
  TGChuyenTiep: Date | null;
  NguoiChuyenTiep: string | null;
  TGPhanHoi: Date | null;
  NoiDungPhanHoi: string;
  TGTCDuKien: Date | null;
  TGHetHan: Date | null;
  GhiChu: string | null;
  TinhTrang: string | null;
  Loai: string | null;
  MaSuCo: string | null;
  MaSCTT: string | null;
  YKienChiDao: string | null;
};

export const Loai = {
  KCTH: 'Không có thật',
  SCNT: 'Sự cố nghiêm trọng',
  SCTL: 'Trùng lặp',
  SDVI: 'Sai đơn vị'
}
import { APPLICATION } from '../../../constants/index';
export const checkAppDonVi = () => {
  const isAppDonVi = location.pathname.search(APPLICATION.QuanLySuCoDonVi) > -1;
  return isAppDonVi;
}
export const checkSuperApp = () => {
  const isSuperApp = location.pathname.search(APPLICATION.QuanLySuCo)>-1;
  return isSuperApp;
}

export const getTinhTrangSCTT = (maDonVi: string, maSCTTs: string) => {
  // tạo một mảng bằng cách tách chuỗi với ký tự ;
  // Mảng này có chứa {TinhTrang} để bước tiếp theo có thể cắt chuỗi để lấy {TinhTrang}
  var baseArray = maSCTTs.split(';');

  // lấy giá trị trong mảng có chứa {MaDonVi}
  var item = baseArray.find(f => f.includes(maDonVi));

  // nếu tồn tại vị trí thì bây giờ sẽ lấy giá trị của vị trí đó trong mảng gốc
  // ví dụ tìm được mã ở vị trí thứ 1 => baseArray[1] = {TinhTrang}-{MaSCTT}
  // sử dụng hàm LEFT để lấy 3 ký tự đầu tiên ({TinhTrang} sẽ có 3 ký tự - MTN,DXL,HTH..) => {TinhTrang}
  var tinhTrang = item && item.substring(0, 3);
  return tinhTrang;
}
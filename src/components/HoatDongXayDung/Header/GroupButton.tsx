import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from './ButtonComponent';
import HeaderButton from './HeaderButton';
import { DM_RGQH_TrangThai } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
import { connect } from 'react-redux';
import HanhChinh from '../../../services/map/models/HanhChinh';
import { alertActions } from '../../../actions';
import { LinhVucCongViec, LinhVucCongViecFull, LinhVuc, CongViec } from '../../../services/map/hoat-dong-xay-dung/models/hoatdongxaydung.model';

var linhVucs: LinhVuc[] = [
  { MaLinhVuc: 'THAMDINH', TenLinhVuc: 'Thẩm định' },
  { MaLinhVuc: 'NLHDXD', TenLinhVuc: 'Năng lực hoạt động xây dựng' },
  { MaLinhVuc: 'CAPPHEP', TenLinhVuc: 'Cấp phép' },
  { MaLinhVuc: 'SUCOCTXD', TenLinhVuc: 'Sự cố công trình xây dựng' },
  { MaLinhVuc: 'KIEMTRA', TenLinhVuc: 'Kiểm tra' },
  { MaLinhVuc: 'THAMMUU', TenLinhVuc: 'Tham mưu' },
  { MaLinhVuc: 'PHOIHOP', TenLinhVuc: 'Phối hợp' },
  { MaLinhVuc: 'KHAC', TenLinhVuc: 'Khác' }
]

var congViecs: CongViec[] = [
  { MaCongViec: 'BAOCAO', TenCongViec: 'Báo cáo' },
  { MaCongViec: 'BCKTKT', TenCongViec: 'BCKTKT' },
  { MaCongViec: 'BTS', TenCongViec: 'BTS' },
  { MaCongViec: 'CAPLAI', TenCongViec: 'Cấp lại' },
  { MaCongViec: 'CBSCN', TenCongViec: 'CBS-CN' },
  { MaCongViec: 'CLUONG', TenCongViec: 'Chất lượng' },
  { MaCongViec: 'CHUTRUONG', TenCongViec: 'Chủ trương' },
  { MaCongViec: 'CLCN', TenCongViec: 'CL-CN' },
  { MaCongViec: 'CMCN', TenCongViec: 'CM-CN' },
  { MaCongViec: 'CNSX', TenCongViec: 'CN-SX' },
  { MaCongViec: 'CTNT', TenCongViec: 'CTNT' },
  { MaCongViec: 'DDCHO', TenCongViec: 'DD-Chợ' },
  { MaCongViec: 'DDDV', TenCongViec: 'DD-DV' },
  { MaCongViec: 'DDNO', TenCongViec: 'DD-NƠ' },
  { MaCongViec: 'DDTDTT', TenCongViec: 'DD-TDTT' },
  { MaCongViec: 'DDTM', TenCongViec: 'DD-TM' },
  { MaCongViec: 'DDGD', TenCongViec: 'DD-GD' },
  { MaCongViec: 'DDVH', TenCongViec: 'DD-VH' },
  { MaCongViec: 'DDVHQC', TenCongViec: 'DD-VH.QC' },
  { MaCongViec: 'DDVP', TenCongViec: 'DD-VP' },
  { MaCongViec: 'DDYT', TenCongViec: 'DD-YT' },
  { MaCongViec: 'DIADIEM', TenCongViec: 'Địa điểm' },
  { MaCongViec: 'DIEUCHINH', TenCongViec: 'Điều chỉnh' },
  { MaCongViec: 'DUAN', TenCongViec: 'Dự án' },
  { MaCongViec: 'GIAHAN', TenCongViec: 'Gia hạn' },
  { MaCongViec: 'GIAMDINH', TenCongViec: 'Giám định' },
  { MaCongViec: 'GOPY', TenCongViec: 'Góp ý' },
  { MaCongViec: 'HOPTHUC', TenCongViec: 'Hợp thức' },
  { MaCongViec: 'HTKT', TenCongViec: 'HTKT' },
  { MaCongViec: 'HUONGDAN', TenCongViec: 'Hướng dẫn' },
  { MaCongViec: 'ISO', TenCongViec: 'ISO' },
  { MaCongViec: 'NNCN', TenCongViec: 'NN-CN' },
  { MaCongViec: 'QSHTS', TenCongViec: 'QSHTS' },
  { MaCongViec: 'SAOLUC', TenCongViec: 'Sao lục' },
  { MaCongViec: 'THKTRXD', TenCongViec: 'Thanh kiểm tra xây dựng' },
  { MaCongViec: 'THAU', TenCongViec: 'Thầu' },
  { MaCongViec: 'TINNGUONG', TenCongViec: 'Tín ngưỡng' },
  { MaCongViec: 'TKCS', TenCongViec: 'TKCS' },
  { MaCongViec: 'TKDTXD', TenCongViec: 'TK-DTXD' },
  { MaCongViec: 'TKXD', TenCongViec: 'TKXD' },
  { MaCongViec: 'TOCHUC', TenCongViec: 'Tổ chức' },
  { MaCongViec: 'TONGIAO', TenCongViec: 'Tôn giáo' },
  { MaCongViec: 'TRAMXANG', TenCongViec: 'Trạm xăng' },
  { MaCongViec: 'TTHC', TenCongViec: 'TTHC' },
  { MaCongViec: 'VONCBDT', TenCongViec: 'Vốn CBĐT' },
]

var values: LinhVucCongViecFull[] = [
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDGD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMDINH') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'CAPPHEP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'NLHDXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'SUCOCTXD') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KIEMTRA') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'THAMMUU') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'PHOIHOP') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BAOCAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BCKTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'BTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CAPLAI') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CBSCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CHUTRUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CLCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CMCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CNSX') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'CTNT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDCHO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDDV') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDNO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTDTT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDTM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVHQC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDVP') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DDYT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIADIEM') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DIEUCHINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'DUAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAHAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GIAMDINH') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'GOPY') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HOPTHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HTKT') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'HUONGDAN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'ISO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'NNCN') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'QSHTS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'SAOLUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THKTRXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'THAU') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TINNGUONG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKCS') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKDTXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TKXD') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TOCHUC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TONGIAO') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TRAMXANG') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'TTHC') as CongViec },
  { LinhVuc: linhVucs.find(f => f.MaLinhVuc === 'KHAC') as LinhVuc, CongViec: congViecs.find(f => f.MaCongViec === 'VONCBDT') as CongViec }
]


const styles = createStyles({
  root: {}
});

type DispatchToProps = {
}

type Props = {

}
  & WithStyles<typeof styles>
  & DispatchToProps;

type States = {

};

class ButtonComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'THAMDINH').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Thẩm định
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        onItemClick={this.handleButtonClick}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'NLHDXD').map(m=>m.CongViec)}>
        Năng lực hoạt động xây dựng
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'CAPPHEP').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Cấp phép
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'SUCOCTXD').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Sự cố công trình xây dựng
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'KIEMTRA').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Kiểm tra
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'THAMMUU').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Tham mưu
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'PHOIHOP').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Phối hợp
      </Button>
      <Button
        onClick={this.handleClick.bind(null, DM_RGQH_TrangThai["Thông tin"])}
        values={values.filter(f=>f.LinhVuc.MaLinhVuc === 'KHAC').map(m=>m.CongViec)}
        onItemClick={this.handleButtonClick}>
        Khác
      </Button>
    </div>;
  }

  handleButtonClick = () => {
  }

  handleClick = () => {
  }

}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ButtonComponent));
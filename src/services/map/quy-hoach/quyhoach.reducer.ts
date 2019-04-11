import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import RanhGioiQuyHoach, { DM_LoaiQuyHoach, DM_RGQH_TrangThai, DoAnQuyHoach } from './models/ranhgioiquyhoach.model';
import HanhChinh from '../models/HanhChinh';
import { DanhMucHoSo, NoiDungGopY } from './models/danhmuchoso.model';



export type Model = {
  hanhChinhSelected?: HanhChinh,
  giaiDoan?: DM_RGQH_TrangThai,
  doAnQuyHoachs?: Array<DoAnQuyHoach>,
  doAnSelected?:RanhGioiQuyHoach,
  danhMucHoSos?: DanhMucHoSo[],
  danhMucHoSoSelected?: DanhMucHoSo,
  noiDungGopYs?: NoiDungGopY[]
};

export const defaultState: Model = {
};

function reducer(state: Model = defaultState, action: QuyHoachAction): Model {
  switch (action.type) {
    case QuyHoachActionType.ChonGiaiDoan:
      return {
        ...state,
        giaiDoan: action.giaiDoan,
        doAnQuyHoachs: undefined,
        hanhChinhSelected: undefined,
        danhMucHoSos: undefined,
        doAnSelected:undefined,
        noiDungGopYs: action.giaiDoan === DM_RGQH_TrangThai["Lấy ý kiến"] ? [] : undefined
      }
      
    case QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh:
      let loaiQuyHoachs: DM_LoaiQuyHoach[] = [
        DM_LoaiQuyHoach["Quy hoạch chung"],
        DM_LoaiQuyHoach["Quy hoạch phân khu"],
        DM_LoaiQuyHoach["Quy hoạch chi tiết"]
      ]
      if (!action.hanhChinh) {
        loaiQuyHoachs = [];
      }
      // nếu không phải là thành phố thì có thêm quy hoạch nông thôn
      else if (action.hanhChinh.MaHuyenTP !== '718') {
        loaiQuyHoachs.push(DM_LoaiQuyHoach["Quy hoạch nông thôn mới"]);
      }
      return {
        ...state,
        hanhChinhSelected: action.hanhChinh,
        doAnQuyHoachs: loaiQuyHoachs.map(m => ({ loaiQuyHoach: m, doAns: [] } as DoAnQuyHoach))
      }

    case QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach_SUCCESS:
      // thêm dữ liệu đồ án quy hoạch
      let doAnQuyHoachs = state.doAnQuyHoachs ? [...state.doAnQuyHoachs] : [];
      let doAnQuyHoach = doAnQuyHoachs.find(f => f.loaiQuyHoach === action.loaiQuyHoach);

      if (doAnQuyHoach) {
        doAnQuyHoach.doAns = action.quyHoachs;
      } else {
        doAnQuyHoach = { loaiQuyHoach: action.loaiQuyHoach, doAns: action.quyHoachs };
        doAnQuyHoachs.push(doAnQuyHoach);
      }

      return { ...state, doAnQuyHoachs };

    case QuyHoachActionType.ThongTinQuyHoach_DanhMucHoSo_THEM:
      return { ...state, danhMucHoSos: action.danhMucHoSos }

    case QuyHoachActionType.ThongTinQuyHoach_DanhMucHoSo_SELECTED:
      return { ...state, danhMucHoSoSelected: action.danhMucHoSo};

    case QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach:
      return { ...state, doAnSelected:action.rgqh,noiDungGopYs: state.giaiDoan === DM_RGQH_TrangThai["Lấy ý kiến"] ? [] : undefined };

    case QuyHoachActionType.GopYQuyHoach_NhapNoiDungGopY:
      if (!state.noiDungGopYs && action.hoSo.ID)
        return state;
      let noiDungGopYs = [...state.noiDungGopYs];

      let noiDungGopY = noiDungGopYs.find(f => f.hoSo.ID === action.hoSo.ID);
      // kiểm tra đã tồn tại hay chưa
      if (noiDungGopY) {
        noiDungGopY.noiDung = action.noiDung;
      } else {
        noiDungGopY = { hoSo: action.hoSo, noiDung: action.noiDung };
        noiDungGopYs.push(noiDungGopY);
      }
      return { ...state, noiDungGopYs };

    default:
      return state;
  }
}

export default reducer;
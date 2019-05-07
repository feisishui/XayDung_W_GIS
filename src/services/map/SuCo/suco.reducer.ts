import { ThongKe, TinhTrang } from './suco.model';
import { MapSuCoActionType } from './suco.action-types';
import { MapSuCoAction } from './suco.action-rule';
import FeatureLayer from '../../../map-lib/layers/FeatureLayer';
import { Model as SuCoModel } from './suco.model';
import { checkAppDonVi, getTinhTrangSCTT } from './suco.helper';
import Auth from '../../../modules/Auth';
export type Model = {
  chartData: ThongKe[],
  infoDatas?: any[],
  newIDSuCo?: string,
  socket: SocketIOClient.Socket,
  layer?: FeatureLayer,
  items: SuCoModel[],
  modelSelected?: SuCoModel
};

export const defaultState: Model = {
  chartData: [{
    name: 'Chưa sửa', value: 1, code: TinhTrang.MoiTiepNhan
  },
  {
    name: 'Đang sửa', value: 1, code: TinhTrang.DangXuLy
  },
  {
    name: 'Đã sửa', value: 1, code: TinhTrang.HoanThanh
  }],
  socket: {} as any,
  items: []
};

function reducer(state: Model = defaultState, action: MapSuCoAction): Model {
  switch (action.type) {
    case MapSuCoActionType.INFO_QUERY_SUCCESS:
      return { ...state, infoDatas: action.datas };
    case MapSuCoActionType.INFO_QUERY_EMPTY:
      return { ...state, infoDatas: undefined };
    case MapSuCoActionType.NEW_ID_SUCO:
      return { ...state, newIDSuCo: action.id };
    case MapSuCoActionType.SET_LAYER:
      return { ...state, layer: action.layer as FeatureLayer };
    case MapSuCoActionType.INITIAL_ITEMS:
      let newChart = capNhatChart(action.datas);
      return { ...state, items: action.datas, chartData: newChart };
    case MapSuCoActionType.ADD_ITEM:
      return { ...state, items: [...state.items, action.data] };
    case MapSuCoActionType.REMOVE_ITEM:
      var items = [...state.items];
      const index = state.items.findIndex(f => f.MaSuCo === action.id);
      if (index > -1) { items.splice(index, 1); }
      return { ...state, items };
    case MapSuCoActionType.SET_CHI_TIET:
      return { ...state, modelSelected: action.data };
    case MapSuCoActionType.SUBMIT_CHUYEN_DON_VI:
      if (state.modelSelected) {
        let newModelSelected = {
          ...state.modelSelected,
          SuCoThongTins: state.modelSelected.SuCoThongTins
            ? [action.data, ...state.modelSelected.SuCoThongTins]
            : [action.data]
        } as SuCoModel;
        return {
          ...state, modelSelected: newModelSelected
        };
      }
      return state;
    default:
      return state;
  }
}

/**
 * Cập nhật lại dữ liệu của biểu đồ
 * @param datas 
 */
function capNhatChart(datas: SuCoModel[]) {
  let newChart = defaultState.chartData.slice(); // clone
  const isAppDonVi = checkAppDonVi();
  const user = Auth.getUser();

  function layTinhTrangSCTT(data: SuCoModel) {
    if (!user) { return; }
    if (data.MaSCTTs) {
      return getTinhTrangSCTT(user.username.replace('qlsc_',''), data.MaSCTTs);
    }
    return null;
  }

  // cập nhật lại value
  newChart.forEach(f => {
    // tùy vào trường hợp
    // nếu ở trường hợp bình thường thì tình trạng sẽ phụ thuộc vào thuộc tính {TinhTrang} của lớp Sự cố
    // nếu ở trường hợp của các đơn vị thì tình trạng sẽ phụ thuộc vào thuộc tính {TinhTrang} của lớp Sự cố thông tin
    // tuy nhiên vì vấn đề kỹ thuật nên phải lấy {TinhTrang} của Sự cố thông tin từ thuộc tính {MaSCTTs} ở lớp Sự cố
    // {MaSCTTs} sẽ theo quy tắc [{TinhTrang lớp sự cố thông tin}-{MaSCTT lớp sự cố thông tin};...]

    // kiểm tra ứng dụng đang chạy thuộc trường hợp nào
    if (isAppDonVi && user) {
      f.value = datas.filter(filter => layTinhTrangSCTT(filter) === f.code).length;
    } else {
      f.value = datas.filter(filter => filter.TinhTrang === f.code).length;
    }
  });
  return newChart;
}

export default reducer;
import { alertActions, loading } from '../../main/main.action';
import RanhGioiQuyHoach, { DM_RGQH_TrangThai, DM_LoaiQuyHoach, RanhGioiQuyHoachName } from './models/ranhgioiquyhoach.model';
import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { Dispatch } from 'redux';
import HanhChinh from '../models/HanhChinh';
import { AllModelReducer } from '../../../reducers/index';
import { LAYER } from '../../../constants/index';
import MainAction from '../../main/main.action-rule';
import { DanhMucHoSo } from './models/danhmuchoso.model';
import { YKienQuyHoach } from './models/ykienquyhoach.model';
import DanhMucHoSoAPI from './api/danhmuchoso.api';
import YKienQuyHoachAPI from './api/ykienquyhoach.api';

export const chonGiaiDoan = (giaiDoan: DM_RGQH_TrangThai): QuyHoachAction => {
  return {
    type: QuyHoachActionType.ChonGiaiDoan,
    giaiDoan
  }
}

/**
 * Action chọn hành chính
 * @param giaiDoan Giai đoạn quy hoạch
 * @param hanhChinh Mã hành chính
 */
export const chonHanhChinh = (hanhChinh: HanhChinh) => {
  return (dispatch: Dispatch<QuyHoachAction>) => {
    dispatch({
      type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh,
      hanhChinh
    })
  }
}


/**
 * Chọn loại quy hoạch
 * @param params tham số
 */
export const chonLoaiQuyHoach = (params: { maQuanHuyen?: string, loaiQuyHoach: DM_LoaiQuyHoach, giaiDoan?: DM_RGQH_TrangThai }) => {
  return async (dispatch: Dispatch<QuyHoachAction | MainAction>, getState: () => AllModelReducer) => {
    const quyHoachStore = getState().quyHoach;
    const maQuanHuyen = params.maQuanHuyen || quyHoachStore.hanhChinhSelected && quyHoachStore.hanhChinhSelected.MaHuyenTP;
    const loaiQuyHoach = params.loaiQuyHoach;
    const giaiDoan = params.giaiDoan || quyHoachStore.giaiDoan;

    try {
      dispatch(loading.loadingReady());
      if (maQuanHuyen
        && loaiQuyHoach
        && giaiDoan) {
        const view = getState().map.view;

        if (view) {
          const rgqhLayer = view.map.findLayerById(LAYER.RanhGioiQuyHoach) as __esri.FeatureLayer;
          if (rgqhLayer) {
            const features = (await rgqhLayer.queryFeatures({
              where: `LoaiQuyHoach = '${loaiQuyHoach}' and MaQuanHuyen = '${maQuanHuyen}' and TrangThai = '${giaiDoan}'`,
              returnGeometry: false,
              outFields: ['OBJECTID', RanhGioiQuyHoachName.TenDuAn, RanhGioiQuyHoachName.MaDuAn]
            })).features;

            if (features.length === 0) {
              dispatch(alertActions.info('Không có dữ liệu'));
            } else {
              dispatch({
                type: QuyHoachActionType.ThongTinQuyHoach_ChonLoaiQuyHoach_SUCCESS,
                hanhChinh: { MaHuyenTP: maQuanHuyen },
                loaiQuyHoach,
                quyHoachs: features.map(m => m.attributes)
              });
            }
          } else {
            throw new Error('Không tìm thấy lớp dữ liệu ranh giới quy hoạch');
          }
        } else {
          throw new Error('Không xác định được view engine');
        }



      } else {
        throw new Error('Không xác định đủ thông tin');
      }
    } catch (error) {
      dispatch(alertActions.error(error.message));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  };
}


export const chonDoAnQuyHoach = (params: { rgqh: RanhGioiQuyHoach }) => {
  return async (dispatch: Dispatch<MainAction | QuyHoachAction>, getState: () => AllModelReducer) => {
    // focus theo objectId
    try {
      dispatch(loading.loadingReady());
      dispatch(setDanhMucHoSo());
      dispatch(pushAction());
      if (!params.rgqh.OBJECTID) {
        throw new Error('Không xác định được thuộc tính định danh của đồ án');
      }
      const view = getState().map.view;

      if (view) {
        const features = await focusRanhQuyHoach(view, params.rgqh.OBJECTID);

        if (features && features.length > 0) {
          dispatch(pushAction(params.rgqh));
          view.popup.open({ features, updateLocationEnabled: true });
          // lấy danh mục hồ sơ
          dispatch(alertActions.info('Đang tải danh mục hồ sơ...'));
          const danhMuc = await new DanhMucHoSoAPI().byDoAn(features[0].attributes[RanhGioiQuyHoachName.MaDuAn])
          dispatch(setDanhMucHoSo(danhMuc));
          dispatch(alertActions.clear());
        } else {
          throw new Error('Không tìm thấy lớp dữ liệu ranh giới quy hoạch');
        }
      } else {
        throw new Error('Không xác định được view engine');
      }
    } catch (error) {
      dispatch(alertActions.error(error.message));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }

  function pushAction(rgqh?: RanhGioiQuyHoach): QuyHoachAction {
    return {
      type: QuyHoachActionType.ThongTinQuyHoach_ChonQuyHoach,
      rgqh
    }
  }
}

export const setDanhMucHoSo = (danhMucHoSos?: DanhMucHoSo[]): QuyHoachAction => ({
  type: QuyHoachActionType.ThongTinQuyHoach_DanhMucHoSo_THEM,
  danhMucHoSos
});

export const chonHoSo = (hoSo?: DanhMucHoSo): QuyHoachAction => ({
  type: QuyHoachActionType.ThongTinQuyHoach_DanhMucHoSo_SELECTED,
  danhMucHoSo: hoSo
})

export const capNhatNoiDungGopY = (noiDung: string, hoSo: DanhMucHoSo) => {
  return (dispatch: Dispatch<QuyHoachAction | MainAction>) => {
    if (!hoSo.ID) {
      dispatch(alertActions.error('Không tìm thấy định danh của hồ sơ, vui lòng thử lại thao tác'));
      return;
    }
    dispatch(alertActions.success('Đã cập nhật nội dung góp ý cho hồ sơ ' + (hoSo.TenHoSo || hoSo.ID)));
    dispatch({
      type: QuyHoachActionType.GopYQuyHoach_NhapNoiDungGopY,
      hoSo, noiDung
    });
  }
}

/**
 * Tra cứu ranh quy hoạch
 * @param params Nội dung tra cứu
 */
export const traCuuTheoDuAn = (params: { maHuyenTP?: string, maPhuongXa?: string, loaiQuyHoach?: DM_LoaiQuyHoach }) => {
  return async (dispatch: Dispatch<QuyHoachAction | MainAction>, getState: () => AllModelReducer): Promise<RanhGioiQuyHoach[]> => {
    try {
      if (params.maHuyenTP
        || params.maPhuongXa
        || params.loaiQuyHoach) {
        dispatch(loading.loadingReady());
        const view = getState().map.view;

        if (view) {
          const rgqhLayer = view.map.findLayerById(LAYER.RanhGioiQuyHoach) as __esri.FeatureLayer;
          if (rgqhLayer) {
            let wheres = [];
            params.maHuyenTP && wheres.push(`MaQuanHuyen = '${params.maHuyenTP}'`);
            params.maPhuongXa && wheres.push(`MaPhuongXa = '${params.maPhuongXa}'`);
            params.loaiQuyHoach && wheres.push(`LoaiQuyHoach = '${params.loaiQuyHoach}'`);
            const features = (await rgqhLayer.queryFeatures({
              where: wheres.join(' AND '),
              returnGeometry: false,
              outFields: ['OBJECTID', RanhGioiQuyHoachName.TenDuAn, RanhGioiQuyHoachName.MaDuAn]
            })).features;

            if (features.length === 0) {
              dispatch(alertActions.info('Không có dữ liệu'));
            } else {
              dispatch(alertActions.success('Tìm thấy ' + features.length + ' đồ án'));
              return features.map(m => m.attributes)
            }
          } else {
            throw new Error('Không tìm thấy lớp dữ liệu ranh giới quy hoạch');
          }
        } else {
          throw new Error('Không xác định được view engine');
        }
      } else {
        dispatch(alertActions.info('Vui lòng chọn tiêu chí tìm kiếm'));
      }
    } catch (error) {
      dispatch(alertActions.error(error.message));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
    return [];
  };
};

/**
 * Click vào kết quả tra cứu theo dự án
 * @param params 
 */
export const clickKetQuaTraCuuDuAn = (params: { doAn: RanhGioiQuyHoach }) => {
  return async (dispatch: Dispatch<MainAction>, getState: () => AllModelReducer) => {
    try {
      dispatch(loading.loadingReady());

      if (!params.doAn.OBJECTID) {
        throw new Error('Không xác định được thuộc tính định danh của đồ án');
      }

      const view = getState().map.view;

      if (view) {
        await focusRanhQuyHoach(view, params.doAn.OBJECTID);
      } else {
        throw new Error('Không xác định được view engine');
      }
    } catch (error) {
      dispatch(alertActions.error(error.message));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }
}

/**
 * Goto đến vị trí ranh quy hoạch
 * @params objectId mã đối tượng goTo
 */
var highlightDoAnQuyHoach: IHandle | null = null;
const focusRanhQuyHoach = async (view: __esri.MapView | __esri.SceneView, objectId: number) => {
  const rgqhLayer = view.map.findLayerById(LAYER.RanhGioiQuyHoach) as __esri.FeatureLayer;
  if (rgqhLayer) {
    const layerView = await view.whenLayerView(rgqhLayer);
    const features = (await rgqhLayer.queryFeatures({
      returnGeometry: true,
      outSpatialReference: view.spatialReference,
      objectIds: [objectId],
      outFields: ['*']
    })).features;
    highlightDoAnQuyHoach && highlightDoAnQuyHoach.remove();
    highlightDoAnQuyHoach = (layerView as __esri.FeatureLayerView).highlight([objectId]);

    if (features.length > 0) view.goTo(features);
    return features;
  }
  return null;
};

export function hienThiTraCuu(mode: boolean = false): QuyHoachAction {
  return {
    type: QuyHoachActionType.TraCuu_HienThi,
    mode
  }
}


/**
 * Cập nhật ý kiến quy hoạch vòa cơ sở dữ liệu
 * @param yKienQuyHoach Nội dung ý kiến
 */
export const luuYKienQuyHoach = (yKienQuyHoach: YKienQuyHoach) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer):Promise<boolean> => {
    try {
      dispatch(alertActions.info('Đang cập nhật...'));
      dispatch(loading.loadingReady());
      if(!yKienQuyHoach.SoToTrinhCDT) throw new Error('Không xác định được mã dự án');
      await new YKienQuyHoachAPI().add(yKienQuyHoach);
      dispatch(alertActions.success('Cập nhật ý kiến quy hoạch thành công'));
      return true;
    } catch (error) {
      dispatch(alertActions.error(error && error.message));
    }
    finally{
      dispatch(loading.loadingFinish());
    }
    return false;
  }
}
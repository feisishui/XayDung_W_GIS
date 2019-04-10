import { alertActions, loading } from '../../main/main.action';
import { DM_RGQH_TrangThai, DM_LoaiQuyHoach, RanhGioiQuyHoachName } from './models/ranhgioiquyhoach.model';
import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { Dispatch } from 'redux';
import HanhChinh from '../models/HanhChinh';
import { AllModelReducer } from '../../../reducers/index';
import { LAYER } from '../../../constants/index';
import MainAction from '../../main/main.action-rule';
import { DanhMucHoSo } from './models/danhmuchoso.model';


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
              outFields: ['OBJECTID', RanhGioiQuyHoachName.TenDuAn]
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

var highlightDoAnQuyHoach: IHandle | null = null;
export const chonDoAnQuyHoach = (params: { objectId: number }) => {
  return async (dispatch: Dispatch<MainAction | QuyHoachAction>, getState: () => AllModelReducer) => {
    // focus theo objectId
    try {
      dispatch(loading.loadingReady());
      dispatch(setDanhMucHoSo());
      const view = getState().map.view;

      if (view) {
        const rgqhLayer = view.map.findLayerById(LAYER.RanhGioiQuyHoach) as __esri.FeatureLayer;
        if (rgqhLayer) {
          view.whenLayerView(rgqhLayer)
            .then(layerView => {
              rgqhLayer.queryFeatures({
                returnGeometry: true,
                outSpatialReference: view.spatialReference,
                objectIds: [params.objectId],
                outFields: [RanhGioiQuyHoachName.MaDuAn]
              })
                .then(res => {
                  highlightDoAnQuyHoach && highlightDoAnQuyHoach.remove();
                  highlightDoAnQuyHoach = (layerView as __esri.FeatureLayerView).highlight([params.objectId]);
                  view.goTo(res.features);
                });

              dispatch(setDanhMucHoSo([{ ID: 1, LoaiHoSo: 1, TenHoSo: 'Test', TenTep: 'hoso.jpg' }
                , { ID: 1, LoaiHoSo: 2, TenHoSo: 'Test', TenTep: 'hoso.jpg' }
                , { ID: 1, LoaiHoSo: 3, TenHoSo: 'Test', TenTep: 'hoso.jpg' }]))
            });
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
}

export const setDanhMucHoSo = (danhMucHoSos?: DanhMucHoSo[]): QuyHoachAction => ({
  type: QuyHoachActionType.ThongTinQuyHoach_DanhMucHoSo_THEM,
  danhMucHoSos
});
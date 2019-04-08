import { alertActions, loading } from '../../main/main.action';
import { DM_RGQH_TrangThai, DM_LoaiQuyHoach, RanhGioiQuyHoachName } from './models/ranhgioiquyhoach.model';
import { QuyHoachActionType } from './quyhoach.action-types';
import { QuyHoachAction } from './quyhoach.action-rule';
import { Dispatch } from 'redux';
import HanhChinh from '../models/HanhChinh';
import { AllModelReducer } from '../../../reducers';
import { LAYER } from '../../../constants';
import MainAction from '../../main/main.action-rule';


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
  return (dispatch: Dispatch<QuyHoachAction>, getState: () => AllModelReducer) => {
    const giaiDoan = getState().quyHoach.giaiDoan;
    switch (giaiDoan) {
      case DM_RGQH_TrangThai["Thông tin"]:
        dispatch({
          type: QuyHoachActionType.ThongTinQuyHoach_ChonHanhChinh,
          hanhChinh
        });
        break;

      default:
        break;
    }
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
      const view = getState().map.view;

      if (view) {

        const rgqhLayer = view.map.findLayerById(LAYER.RanhGioiQuyHoach) as __esri.FeatureLayer;
        if (rgqhLayer) {
          const layerView = await view.whenLayerView(rgqhLayer);
          const features = (await rgqhLayer.queryFeatures({
            returnGeometry: true,
            outSpatialReference: view.spatialReference,
            objectIds: [params.objectId]
          })).features;
          highlightDoAnQuyHoach && highlightDoAnQuyHoach.remove();
          highlightDoAnQuyHoach = (layerView as __esri.FeatureLayerView).highlight([params.objectId]);
          view.goTo(features);
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
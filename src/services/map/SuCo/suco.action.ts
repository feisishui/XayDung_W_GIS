import { Dispatch } from 'redux';
import { MapSuCoAction } from './suco.action-rule';
import { MapSuCoActionType } from './suco.action-types';
import { loading, alertActions } from '../../main/main.action';
import MSG from '../../../constants/MSG';
import Auth from '../../../modules/Auth';
import { SEARCH_OUTFIELDS, TinhTrang, Model, ModelConstant } from './suco.model';
import SuCoThongTinAPI from './api/sucothongtin.api';

//Esri
import FeatureLayer from '../../../map-lib/layers/FeatureLayer';
import FeatureTable from '../../../map-lib/layers/FeatureTable';
import SuCoThongTin from './models/sucothongtin.model';
import { AllModelReducer } from '../../../reducers';
import { checkAppDonVi } from './suco.helper';


const apiSCTT = new SuCoThongTinAPI();


export const setInfos = (datas: any[]): MapSuCoAction => (
  { type: MapSuCoActionType.INFO_QUERY_SUCCESS, datas })

/**
 * 
 * @param layer Sự cố layer
 */
export const timKiemTheoTinhTrang = (code: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    const layer = getLayer(getState());
    if (layer) {
      dispatch(loading.loadingReady());
      let where = '';

      // nếu ứng dụng đang là của đơn vị thì query theo MaSCTTs
      const isAppDonVi = checkAppDonVi();
      if (isAppDonVi) {
        const username = Auth.getUser();
        where = `MaSCTTs like '%${code}-${username ? username.username.replace("qlsc_", "") : ""}%'`
      } else {
        where = `TinhTrang = '${code}'`;
      }

      if (layer.layerInfo.Definition) {
        where = `${layer.layerInfo.Definition} and (${where})`;
      }

      layer.queryFeatures({
        where,
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      })
        .then(results => dispatch(setInfos(results.features.map(m => m.attributes))))
        .catch(_ => dispatch(alertActions.error(MSG.CO_LOI_XAY_RA)))
        .always(() => dispatch(loading.loadingFinish()));
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}
/**
 * 
 * @param layer Sự cố layer
 */
export const timKiem = (where: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    const layer = getLayer(getState());
    if (layer) {
      dispatch(loading.loadingReady());
      if (layer.layerInfo.Definition) {
        where = `${layer.layerInfo.Definition} and (${where})`;
      }

      layer.queryFeatures({
        where,
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      })
        .then(results => dispatch(setInfos(results.features.map(m => m.attributes))))
        .catch(_ => dispatch(alertActions.error(MSG.CO_LOI_XAY_RA)))
        .always(() => dispatch(loading.loadingFinish()));
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}

export const emptyInfos = (): MapSuCoAction => ({
  type: MapSuCoActionType.INFO_QUERY_EMPTY
});

/**
 * Lưu dữ liệu sự cố
 * @param layer Sự cố layerr
 * @param info Thông tin
 * @param geometry Vị trí
 */
export const phanAnhSuCo = (info: Model, geometry: __esri.Point,attachments:HTMLFormElement[]
) => {
  return async (dispatch: Dispatch<any>, getState: () => AllModelReducer): Promise<boolean> => {
    const layer = getLayer(getState());
    if (layer) {
      try {
        dispatch(loading.loadingReady());
        const user = Auth.getUser(); // Lây user
        // tạo attributes
        const attributes = {
          TGPhanAnh: new Date().getTime() as any,
          TinhTrang: TinhTrang.MoiTiepNhan,
          SDTNguoiPhanAnh: info.SDTNguoiPhanAnh,
          NguoiPhanAnh: info.NguoiPhanAnh,
          DiaChi: info.DiaChi,
          NoiDungPhanAnh: info.NoiDungPhanAnh,
          LinhVuc: info.LinhVuc,
          NguyenNhan: info.NguyenNhan,
          MaHuyenTP: info.MaHuyenTP,
          MaPhuongXa: info.MaPhuongXa,
          NVTiepNhan: user ? user.username : 'khach',
          OBJECTID: 1
        } as Model;

        // tạo graphic
        const featureAdd = {
          attributes, geometry
        } as any;

        // cập nhật dữ liệu với service
        const result = await layer.applyEdits({
          addFeatures: [featureAdd]
        });

        if (result.addFeatureResults[0].error) throw new Error(result.addFeatureResults[0].error);
        else {
          // cap nhat attachment
          let successObjectId = result.addFeatureResults[0].objectId;
          attachments.forEach(form=>
              layer.addAttachment({attributes:{OBJECTID:successObjectId}} as __esri.Graphic,form)
            );
          const id = await layIDSuCo(layer, result.addFeatureResults[0].objectId);
          dispatch(alertActions.success('Mã sự cố: ' + id)); // thông báo
          dispatch(newIdSuCo(id));
          return true;
        }
      } catch (error) {
        dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
        return false;
      }
      finally {
        dispatch(loading.loadingFinish());
      }
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
      return false;
    }
  }

  function newIdSuCo(id: string): MapSuCoAction { return { type: MapSuCoActionType.NEW_ID_SUCO, id } };
  function layIDSuCo(layer: FeatureLayer, objectId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      layer.queryFeatures({
        objectIds:[objectId],
        outFields: [ModelConstant.MaSuCo],
        returnGeometry: false
      })
        .then(results => {
          const feature = results.features[0];
          resolve(feature.attributes[ModelConstant.MaSuCo]);
        });
    });
  }
}

/**
 * Chuyển sự cố cho đơn vị xử lý
 * @param maSuCo Mã sự cố chuyển tiếp cho đơn vị
 * @param maDonVi Mã đơn vị tiếp nhận sự cố
 */
export const chuyenDonViTiepNhan = (maSuCo: string, maDonVi: string) => {
  return async (dispatch: Dispatch<any>): Promise<boolean> => {
    dispatch(loading.loadingReady());
    try {
      const model = await apiSCTT.add({
        MaDonVi: maDonVi, MaSuCo: maSuCo
      } as SuCoThongTin);

      if (model) {
        // thêm thành công
        dispatch(alertActions.success(MSG.THANH_CONG));
        dispatch({ type: MapSuCoActionType.SUBMIT_CHUYEN_DON_VI, data: model } as MapSuCoAction)
        return true;
      } else {
        throw new Error(MSG.THAT_BAI);
      }
    } catch (error) {
      dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
      return false;
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }
}

export const taiHinhAnhSuCo = (id: string) => {
  return async (_: Dispatch, getState: () => AllModelReducer): Promise<__esri.AttachmentInfo[]> => {
    const layer = getState().mapSuCo.layer;
    if (layer) {
      // lấy objectid từ mã sự cố
      const features = (await layer.queryFeatures({ where: `${ModelConstant.MaSuCo} = '${id}'`, outFields: ['OBJECTID'], returnGeometry: false })).features;
      if (features.length > 0) {
        const objectId = features[0].attributes['OBJECTID'];
        const result = await layer.queryAttachments({
          objectIds: [objectId]
        }) as any;
        return result[objectId];
      }

    }
    return [];
  }
}

export const setLayer = (layer: FeatureLayer) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: MapSuCoActionType.SET_LAYER, layer });

    // request dữ liệu
    if (layer) {
      const result = await layer.queryFeatures({
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        where: layer.layerInfo.Definition || '1=1',
        orderByFields: [`${ModelConstant.TGPhanAnh} desc`]
      });
      dispatch(initialItems(result.features.map(m => m.attributes)))
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}

export const addItem = (data: Model): MapSuCoAction => ({
  type: MapSuCoActionType.ADD_ITEM,
  data
})

export const removeItem = (id: string): MapSuCoAction => ({
  type: MapSuCoActionType.REMOVE_ITEM,
  id
})

/* Used only by actions for sockets */
export const initialItems = (datas: Model[]): MapSuCoAction => ({
  type: MapSuCoActionType.INITIAL_ITEMS,
  datas
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */

export const loadItems = () => {

}

export const addNewItemSocket = (data: Model) => {
  return (_: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit('add-item', data);
  }
}

export const removeItemSocket = (id: string) => {
  return (_: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit('remove-item', id);
  }
}

const getLayer = (state: AllModelReducer) => {
  return state.mapSuCo.layer;
}

/////////////////// SU CO THONG TIN //////////////////////////
export const setThongTinChiTiet = (data?: Model): MapSuCoAction => ({
  type: MapSuCoActionType.SET_CHI_TIET, data
});

/**
 * Lấy thông tin sự cố thông tin theo sự cố thông qua OBJECTID
 * @param data Sự cố
 */
export const getThongTinChiTiet = (data: Model) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer) => {
    try {
      const layer = getState().mapSuCo.layer;
      if (!layer) throw new Error(MSG.KHONG_TIM_THAY_LAYER)
      dispatch(loading.loadingReady());
      const result = await layer.queryRelatedFeatures({
        outFields: ['*'],
        returnGeometry: false,
        objectIds: [data.OBJECTID],
        relationshipId: 0,
        definitionExpression: layer.layerInfo.Definition ? layer.layerInfo.Definition.replace('SCTTs', 'SCTT') : '1=1' // replace vì theo cấu trúc sẽ definition ở lớp sự cố, nhưng chuyern qua definition bên lớp sctt thì phải bỏ s
      });
      if (result[data.OBJECTID]) {
        data.SuCoThongTins = (result[data.OBJECTID].features as __esri.Graphic[]).map(m => m.attributes);
      }
      dispatch(setThongTinChiTiet(data));
    } catch (error) {
      dispatch(alertActions.error(error ? error.message || MSG.CO_LOI_XAY_RA : MSG.CO_LOI_XAY_RA));
    }
    finally {
      dispatch(loading.loadingFinish());
    }

  }
}

/**
 * Gửi nội dung xử lý cho bộ phận quản lý
 * @param data Sự cố thông tin
 */
export const traoDoiSuCoThongTin = (data: SuCoThongTin) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer) => {
    try {
      if (!data.MaSCTT) throw new Error('Không xác định được mã');
      dispatch(loading.loadingReady());
      const result = await apiSCTT.update(data.MaSCTT, {
        GhiChu: data.GhiChu, TinhTrang: TinhTrang.DangXuLy, NoiDungPhanHoi: data.NoiDungPhanHoi, TGPhanHoi: new Date()
      } as SuCoThongTin, true);

      if (result) {
        dispatch(alertActions.success());

        // nếu có sự thay đổi tình trạng thì cập nhật lại layer
        if (data.TinhTrang != result.TinhTrang) {
          const layer = getState().mapSuCo.layer;
          layer && layer.refresh();
        }
        var oldModel = getState().mapSuCo.modelSelected;
        if (oldModel) {
          let newModel = { ...oldModel };
          newModel.SuCoThongTins = [result];
          dispatch(setThongTinChiTiet(newModel));
        }
      }
      else throw new Error(MSG.THAT_BAI);

      return result;
    } catch (error) {
      dispatch(alertActions.error(error ? error.message || MSG.CO_LOI_XAY_RA : MSG.CO_LOI_XAY_RA));
      return null;
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }
}

export const hoanThanhSuCoThongTin = (data: SuCoThongTin) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer) => {
    try {
      if (!data.MaSCTT) throw new Error('Không xác định được mã');
      dispatch(loading.loadingReady());
      const result = await apiSCTT.update(data.MaSCTT, {
        GhiChu: data.GhiChu, NoiDungPhanHoi: data.NoiDungPhanHoi, TGPhanHoi: new Date(), TinhTrang: TinhTrang.HoanThanh
      } as SuCoThongTin, true);

      if (result) {
        dispatch(alertActions.success());
        // nếu có sự thay đổi tình trạng thì cập nhật lại layer
        if (data.TinhTrang != result.TinhTrang) {
          const layer = getState().mapSuCo.layer;
          layer && layer.refresh();
        }
        var oldModel = getState().mapSuCo.modelSelected;
        if (oldModel) {
          let newModel = { ...oldModel };
          newModel.SuCoThongTins = [result];
          dispatch(setThongTinChiTiet(newModel));
        }

      }
      else throw new Error(MSG.THAT_BAI);

      return result;
    } catch (error) {
      dispatch(alertActions.error(error ? error.message || MSG.CO_LOI_XAY_RA : MSG.CO_LOI_XAY_RA));
      return null;
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }
}

export const taiHinhAnhSCTT = (id: number) => {
  return async (_: Dispatch, getState: () => AllModelReducer): Promise<__esri.AttachmentInfo[]> => {
    const layer = getState().mapSuCo.layer;
    if (layer) {
      // lấy url layer sự cố để tạo url bảng sự cố thông tin
      const url = layer.url + '/1';
      // tạo feature layer mục đích để get attachment vì arcgis js 4.9 chưa hổ trợ feature table
      let featureTable = new FeatureTable({
        url
      });

      const result = await featureTable.queryAttachments(id);
      return result;
    }
    return [];
  }
}
export const themHinhAnhSCTT = (id: number, form: HTMLFormElement) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer): Promise<__esri.AttachmentInfo | null> => {
    try {
      dispatch(loading.loadingReady());
      const layer = getState().mapSuCo.layer;
      if (!layer) throw new Error(MSG.KHONG_TIM_THAY_LAYER)
      // lấy url layer sự cố để tạo url bảng sự cố thông tin
      const url = layer.url + '/1';
      // tạo feature layer mục đích để get attachment vì arcgis js 4.9 chưa hổ trợ feature table
      let featureTable = new FeatureTable({
        url
      });

      const result = await featureTable.addAttachment(id, form);
      if (result && result.objectId) return {
        id: result.objectId, name: (form.lastChild as HTMLInputElement).value.split(/(\\|\/)/g).pop(),
        url: `${url}/${id}/attachments/${result.objectId}`,
        contentType: 'image/png'
      } as __esri.AttachmentInfo;
    } catch (error) {
      dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
    return null;
  }
}
/**
 * Xóa hình ảnh khỏi lớp sự cố thông tin
 * @param id OBJECTID của Sự cố thông tin
 * @param attachmentId Attachment ID
 */
export const xoaHinhAnhSCTT = (id: number, attachmentId: number) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer): Promise<boolean> => {
    try {
      dispatch(loading.loadingReady());
      const layer = getState().mapSuCo.layer;
      if (!layer) throw new Error(MSG.KHONG_TIM_THAY_LAYER)
      // lấy url layer sự cố để tạo url bảng sự cố thông tin
      const url = layer.url + '/1';
      // tạo feature layer mục đích để get attachment vì arcgis js 4.9 chưa hổ trợ feature table
      let featureTable = new FeatureTable({
        url
      });

      const result = await featureTable.deleteAttachments(id, [attachmentId]);
      if (result && result.length > 0 && result[0].success) return true;
    } catch (error) {
      dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
    }
    finally {
      dispatch(loading.loadingFinish());
    }
    return false;

  }
}

/////////////////// END SU CO THONG TIN ///////////////////
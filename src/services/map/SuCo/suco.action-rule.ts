import { MapSuCoActionType } from "./suco.action-types";
import { Model } from './suco.model';
import SuCoThongTin from './models/sucothongtin.model';
export type MapSuCoAction =
  { type: MapSuCoActionType.INFO_QUERY_SUCCESS, datas: any[] }
  | { type: MapSuCoActionType.INFO_QUERY_EMPTY }
  | { type: MapSuCoActionType.SEARCH_FORM, where: string }
  | { type: MapSuCoActionType.NEW_ID_SUCO, id: string }
  | { type: MapSuCoActionType.SUBMIT_CHUYEN_DON_VI, data:SuCoThongTin }
  | { type: MapSuCoActionType.INITIAL_ITEMS, datas: Model[] }
  | { type: MapSuCoActionType.ADD_ITEM, data: Model }
  | { type: MapSuCoActionType.REMOVE_ITEM, id: string }
  | { type: MapSuCoActionType.SET_LAYER, layer: __esri.FeatureLayer }
  | { type: MapSuCoActionType.SET_CHI_TIET, data?:Model }

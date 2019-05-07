import { combineReducers } from 'redux';
import mainReducer, { Model as MainModel, defaultState as mainState } from '../services/main/main.reducer';
import mapReducer, {
  Model as MapModel, defaultState as mapState,
} from '../services/map/map.reducer';
import quyHoachReducer, {
  Model as QuyHoachModel, defaultState as quyHoachState,
} from '../services/map/quy-hoach/quyhoach.reducer';
import suCoReducer, {
  Model as SuCoModel, defaultState as sucoState,
} from '../services/map/SuCo/suco.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export type AllModelReducer = {
  main: MainModel,
  map: MapModel,
  quyHoach:QuyHoachModel,
  mapSuCo:SuCoModel
};

export const initialState: AllModelReducer = {
  main: mainState,
  map: mapState,
  quyHoach:quyHoachState,
  mapSuCo:sucoState
};
const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  map: mapReducer,
  quyHoach:quyHoachReducer,
  mapSuCo:suCoReducer
});

export default reducers;

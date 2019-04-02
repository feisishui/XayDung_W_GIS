import { combineReducers } from 'redux';
import mainReducer, { Model as MainModel, defaultState as mainState } from '../services/main/main.reducer';
import mapReducer, {
  Model as MapModel, defaultState as mapState,
} from '../services/map/map.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export type AllModelReducer = {
  main: MainModel,
  map: MapModel,
};

export const initialState: AllModelReducer = {
  main: mainState,
  map: mapState,
};
const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  map: mapReducer,
});

export default reducers;

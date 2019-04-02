import { API_URL,  get } from '../api';
import fetch from '../../helpers/fetch';
import LayerInfo from './models/LayerInfo';
import Auth from '../../modules/Auth';
export async function getLayerInfos(): Promise<LayerInfo[]> {
  try {
    var url = API_URL + '/Account/LayerInfo';
    let result: LayerInfo[] = [];
    if (Auth.isUserAuthenticated()) {
      var response = await get(url);
      result = response.data as LayerInfo[];
    } else {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      var response = await fetch(url + '/Anonymous', { method: 'GET', headers });
      result = response.data as LayerInfo[];
    }
    return result;
  } catch (error) {
    return Promise.reject(error.Message);
  }
}
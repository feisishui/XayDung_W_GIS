import IService from "../../../api/IService";
import { YKienQuyHoach } from '../models/ykienquyhoach.model';
import fetch from '../../../../helpers/fetch';
import { API_URL } from "../../../api/index";

const URL = API_URL + '/odata/YKienQuyHoachs'

export default class YKienQuyHoachAPI implements IService<YKienQuyHoach, number>{
  getById(id: number): Promise<YKienQuyHoach> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<YKienQuyHoach[]> {
    const result = await fetch(URL, { method: 'GET' });
    if (result.status == 200) {
      return result.data;
    } else {
      throw new Error(result.data);
    }
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async add(model: YKienQuyHoach): Promise<YKienQuyHoach> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(URL, { method: 'POST', headers, body: JSON.stringify(model) });
    if (result.status === 201) {
      return result.data
    } else {
      throw new Error(result.data);
    }
  }
  update(id: number, model: YKienQuyHoach): Promise<YKienQuyHoach> {
    throw new Error("Method not implemented.");
  }


}
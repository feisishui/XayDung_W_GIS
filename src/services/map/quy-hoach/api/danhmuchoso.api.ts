import IService from "../../../api/IService";
import { DanhMucHoSo } from '../models/danhmuchoso.model';
import fetch from '../../../../helpers/fetch';
import { API_URL } from "../../../api";

const URL = API_URL + '/TepDinhKemDanhMucHoSo'

export default class DanhMucHoSoAPI implements IService<DanhMucHoSo, number>{
  getById(id: number): Promise<DanhMucHoSo> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<DanhMucHoSo[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  add(model: DanhMucHoSo): Promise<DanhMucHoSo> {
    throw new Error("Method not implemented.");
  }
  update(id: number, model: DanhMucHoSo): Promise<DanhMucHoSo> {
    throw new Error("Method not implemented.");
  }

  async byDoAn(maDoAn: string): Promise<DanhMucHoSo[]> {
    const result = await fetch(URL + '/ByDoAn/' + maDoAn, { method: 'GET' });
    if (result.status === 200) {
      return result.data;
    }
    return [];
  }


}
import { API_URL, odata } from '../../api/index';
import fetch from '../../../helpers/fetch';
import IService from '../../api/IService';
import HanhChinh from '../models/HanhChinh';

const PATH = API_URL + '/odata/HanhChinhs';

export default class HanhChinhAPI implements IService<HanhChinh, string>{
  async getById(id: string): Promise<HanhChinh | null> {
    const filter = `$filter=MaHuyenTP eq '${id}'`;
    const url = PATH + `?${filter}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    return result.data;
  }

  async getAllByMaHuyenTP(id: string): Promise<HanhChinh[] | null> {
    const filter = `$filter=MaHuyenTP eq '${id}'`;

    const url = PATH + `?${filter}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    return result.data.value;
  }

  async getAll(): Promise<HanhChinh[]> {
    const url = PATH ;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    return result.data.value;
  }
  async getAllOnLyHuyenTP(): Promise<HanhChinh[]> {
    const select = `$select=MaHuyenTP,TenHuyenTP`;
    const url = PATH + `?${select}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    const hanhChinhs = result.data.value as HanhChinh[];
    return hanhChinhs.filter((value, index, self) => self.findIndex(f => f.MaHuyenTP == value.MaHuyenTP) == index)
  }
  delete(id: string): Promise<boolean> {
    const result = odata.delete(PATH + `('${id}')`);
    return result;
  }
  add(model: HanhChinh): Promise<HanhChinh | null> {
    const result = odata.post(PATH, JSON.stringify(model));
    return result;
  }
  update(id: string, model: HanhChinh): Promise<HanhChinh | null> {
    const result = odata.put(PATH + `('${id}')`, JSON.stringify(model));
    return result;
  }
}
import { API_URL, odata } from '../../api/index';
import fetch from '../../../helpers/fetch';
import IService from '../../api/IService';
import GiaoThong from '../models/GiaoThong';

const PATH = API_URL + '/odata/GiaoThongs';

export default class GiaoThongAPI implements IService<GiaoThong, string>{
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  add(model: GiaoThong): Promise<GiaoThong> {
    throw new Error("Method not implemented.");
  }
  update(id: string, model: GiaoThong): Promise<GiaoThong> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<GiaoThong | null> {
    const result = odata.get(PATH + `(${id})`);
    return result;
  }

  async search(text:string): Promise<GiaoThong[]> {
    const filter = `$filter=substringof('${text}',TenConDuong ) and not(MaConDuong eq null) and not(TenConDuong eq null)`;
    const orderby = `$orderby=TenConDuong`
    const top = `$top=10`


    const url = PATH + `?${filter}&${orderby}&${top}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    return result.data.value;
  }

  async getAll(): Promise<GiaoThong[]> {
    const filter = `$filter=not(MaConDuong eq null)`;
    const orderby = `$orderby=TenConDuong`

    const url = PATH + `?${filter}&${orderby}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const result = await fetch(url, {
      method: 'GET',
      headers
    });
    return result.data.value;
  }
}
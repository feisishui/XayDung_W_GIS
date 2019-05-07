import { API_URL, odata } from '../../../api/index';
import IService from '../../../api/IService';
import SuCoThongTin from '../models/sucothongtin.model';

const PATH = API_URL + '/odata/SuCoThongTins';

export default class SuCoThongTinAPI implements IService<SuCoThongTin, string>{
  getById(id: string): Promise<SuCoThongTin | null> {
    const result = odata.get(PATH + `('${id}')`);
    return result;
  }
  getAll(): Promise<SuCoThongTin[]> {
    const result = odata.get(PATH);
    return result;
  }
  delete(id: string): Promise<boolean> {
    const result = odata.delete(PATH + `('${id}')`);
    return result;
  }
  add(model: SuCoThongTin): Promise<SuCoThongTin | null> {
    const result = odata.post(PATH, JSON.stringify(model));
    return result;
  }
  update(id: string, model: SuCoThongTin, merge?: boolean): Promise<SuCoThongTin | null> {
    let func = merge?odata.patch:odata.put;
    const result = func(PATH + `('${id}')`, JSON.stringify(model));
    return result;
  }
}
import esriRequest = require('esri/request');
import Layer = require('esri/layers/Layer');
import fetch from '../../helpers/fetch';
type Constructor = {
  url: string
};

export default class FeatureTable extends Layer {
  get type() {
    return 'table';
  }


  private _url: string = '';
  public get url(): string {
    return this._url;
  }
  public set url(v: string) {
    this._url = v;
  }

  constructor(params: Constructor) {
    super();
    this.url = params.url;
  }



  public addAttachment(id: number, form: HTMLFormElement | FormData): Promise<__esri.FeatureEditResult> {
    return new Promise((resolve, reject) => {
      let url = this.url + "/" + id + "/addAttachment";
      if (form) {
        esriRequest(url, {
          responseType: 'json',
          body: form
        }).then(r => {
          resolve(r.data.addAttachmentResult);
        }).catch(e => reject(e))
      }
    });
  }

  public async deleteAttachments(objectId: number, attachmentIds: number[]): Promise<any[]> {
    const url = `${this.url}/${objectId}/deleteAttachments`;
    var form = new FormData();
    form.append('f', 'json');
    form.append('attachmentIds', attachmentIds.join(','));
    const result = await fetch(url, {
      method: 'POST',
      body: form
    });
    if (result.status === 200) return result.data.deleteAttachmentResults;
    else throw new Error(result.data);

  }

  public async queryAttachments(objectId: number): Promise<__esri.AttachmentInfo[]> {
    const url = `${this.url}/${objectId}/attachments`;
    const response = await fetch(`${url}?f=json`, { method: 'GET', credentials: 'same-origin' });
    if (response && response.status === 200) {
      const result = response.data;
      if (!result.error) {
        return result.attachmentInfos.map((m: any) => {
          m.url = `${url}/${m.id}`
          return m;
        });
      } else {
        throw result;
      }
    } else {
      return [];
    }
  }
}
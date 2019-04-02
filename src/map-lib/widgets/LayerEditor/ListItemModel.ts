import Collection = require('esri/core/Collection');
export default class ListItemModel {
  private _children: Collection<ListItemModel> | undefined;
  public layer: __esri.Layer | undefined;

  public get children() {
    if (!this._children) {
      this._children = new Collection<ListItemModel>();
    }

    return this._children;
  }

  private _parent: ListItemModel | undefined;
  public get parent(): ListItemModel | undefined {
    return this._parent;
  }
  public set parent(v: ListItemModel | undefined) {
    this._parent = v;
  }

  private _visible: boolean = false;
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(v: boolean) {
    this._visible = v;
  }

  private _id: string | undefined;
  public get id(): string {
    return this._id || '';
  }
  public set id(v: string) {
    this._id = v;
  }

  private _title: string | undefined;
  public get title(): string {
    return this._title || '';
  }
  public set title(v: string) {
    this._title = v;
  }
}
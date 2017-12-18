import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ObservableProcess } from '../../ffh-shared/infrastructure/observable-process';
import { ObservableProcessLateBind } from '../../ffh-shared/infrastructure/observable-process-late-bind';
import { BusinessViewBase } from './business-view-base';

export interface IListReadModel {
  name: string;
  readonly id: string;
}


export abstract class BusinessListBase<T extends IListReadModel> extends BusinessViewBase {

  protected _getAllProcess: ObservableProcess = null;
  private _searchQuerySubject: Subject<string> = null;
  private _searchProcess: ObservableProcessLateBind = null;
  public isSearching = false;
  optionModel = {
    searchType: 0,
    searchString: ''
  };

  public model: T[] = [];
  public list: T[] = [];
  public selected: T = null;

  constructor (public modelId: string) {
    super();
  }

  abstract getReadData(): Observable<T[]> ;

  get entityTitle (): string {
    return this.modelId;
  }

  public get getAllProcess (): ObservableProcess {
    if (this._getAllProcess == null) {
      this._getAllProcess = new ObservableProcess(this, 'Error reading list',
       this.getReadData(),
        this.onGetAllProcess,
        () => {
          if (this.selected) {
            this.selected = this.model.filter(item => item.id === this.selected.id)[0];
          }
        }
      );
    }
    return this._getAllProcess;
  }

  protected onGetAllProcess (view: BusinessListBase<T>, data: T[]) {
    const result = data;
    view.model = result;
    view.list = result;
  }

  protected onSelected (item: T) {
    this.selected = item;
  }

  get modelIsSelected (): boolean {
    return this.selected !== null;
  }

  // filter
  onSearchValueChanged (value) {
    if (value) {
      this.list = this.model.filter(item => item.name.search(new RegExp(value, 'i')) !== -1);
    } else {
      this.list = this.model;
    }
  }

  // search
  get searchQuerySubject (): Subject<string> {
    if (this._searchQuerySubject === null) {
      this._searchQuerySubject = new Subject();
    }
    return this._searchQuerySubject;
  }

  get searchProcess (): ObservableProcessLateBind {
    if (this._searchProcess == null) {
      this._searchProcess = new ObservableProcessLateBind(this, 'Error searching');
    }
    return this._searchProcess;
  }

  onSearchProcess (view: BusinessListBase<T>, data: any) {
    view.isSearching = false;
    view.onSearchResult(data);
  }

  onSearchResult (data: T[]) {
    if (data == null) {
      data = [];
    }
    this.model = data;
  }

  searchRefresh () {
    this.onSearchString(this.optionModel['searchString']);
  }

  onSearchString (value) {
    if (value && value.length > 2) {
      this.optionModel['searchString'] = value;
      this.isSearching = true;
      this.searchProcess.doLateBind(
        this.getReadData(),
        this.onSearchProcess,
        view => view.isSearching = false);
    } else {
      this.model = [];
    }
  }
}



import { ObservableProcessLateBind } from '../../ffh-shared/infrastructure/observable-process-late-bind';
import { BusinessListBase, IListReadModel } from './business-list-base';
import {Observable} from 'rxjs/Observable';

export abstract class BusinessSortedBase<T  extends IListReadModel> extends BusinessListBase<T> {

  private _moveUpProcess: ObservableProcessLateBind = null;
  private _moveDownProcess: ObservableProcessLateBind = null;

  constructor (modelId: string ) {
    super(modelId);

  }

  onMove() {
    return Observable.create(observer => {
      observer.next( );
      observer.complete();
    }).delay(500);
  }

  get moveUpProcess (): ObservableProcessLateBind {
    if (this._moveUpProcess == null) {
      this._moveUpProcess = new ObservableProcessLateBind(this, 'error moving');
    }
    return this._moveUpProcess;
  }

  get moveDownProcess (): ObservableProcessLateBind {
    if (this._moveDownProcess == null) {
      this._moveDownProcess = new ObservableProcessLateBind(this, 'error moving');
    }
    return this._moveDownProcess;
  }

  protected onMoveDown () {
    if (this.selected === null) {
      return;
    }

    this.moveDownProcess.doLateBind(
       this.onMove(),
      null,
      () => this.getAllProcess.do()
    );

  }

  protected onMoveUp () {
    if (this.selected === null) {
      return;
    }

    this.moveUpProcess.doLateBind(
       this.onMove(),
      null,
      () => this.getAllProcess.do()
    );

  }
}


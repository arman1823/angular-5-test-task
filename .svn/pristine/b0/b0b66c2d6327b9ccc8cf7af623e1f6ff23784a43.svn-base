import {Observable} from 'rxjs/Observable';

export interface IObserverableProcessView {
  handleError(error: any, title?: string);
  onSpinnerButtonClick();
}

export class ObservableProcess {

  isProcessing = false;
  isError = false;

  private doProcess(latebind: boolean) {
    try {
      this.isProcessing = true;
      this.observable
        .subscribe(
          (data) => {
            this.isProcessing = false;
            if (this.onNext != null) {
              this.onNext(this.view, data);
            }

          },
          (error) => {
            this.handleError(error);
            if (latebind) {
              this.observable = null;
              this.onNext = null;
              this.complete = null;
            }
          },
          () => {
            if (this.complete != null) {
              this.complete(this.view);
              if (latebind) {
                this.observable = null;
                this.onNext = null;
                this.complete = null;
              }
            }
          }
        );

    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error) {
    this.isProcessing = false;
    this.isError = true;

    this.view.handleError(error, this.errorTitle);
  }


  constructor(public view: IObserverableProcessView, public errorTitle: string, public observable?: Observable<any>,
              public onNext?: Function, public complete?: Function) {

  }



  doLateBind( observable: Observable<any>,  onNext?: Function, complete?: Function) {

    this.observable = observable;
    this.onNext = onNext;
    this.complete = complete;


    this.doProcess(true);

  }

  do() {

    this.doProcess(false);

  }


}

import {Input} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {ObservableProcessLateBind} from '../../ffh-shared/infrastructure/observable-process-late-bind';
import {ObservableProcess} from '../../ffh-shared/infrastructure/observable-process';
import {Alert, alertType } from '../../ffh-shared/ui/alert/alert';

import {IApiModel} from './business.models';
import {Observable} from 'rxjs/Observable';


export class EditDialogData {

  constructor (public modelId: string,
               public updateMode: UpdateMode,
               public model: object,
               public apiModel: IApiModel,
               public returnModel: object) {

  }

  prepareApiModel () {
    this.apiModel.prepare(this.model);
  }
}

export enum UpdateMode { add, edit, delete }

export enum EditDialogComponentView {
  edit,
  delete,
  view,
  list
}

export abstract class EditDialogBase {

  nextAlertId = 1;
  alerts: Array<Alert> = [];

  @Input() template: any;

  private _submitProcess: ObservableProcessLateBind = null;
  private _getEntityProcess: ObservableProcess = null;

  updateMode: UpdateMode = UpdateMode.add;
  UpdateMode = UpdateMode;

  componentView: EditDialogComponentView = EditDialogComponentView.edit;
  EditDialogComponentView = EditDialogComponentView;
  showSummery = false;

  constructor (private dialogRef: MatDialogRef<EditDialogBase>,
               public data: EditDialogData) {


    this.updateMode = this.data.updateMode;

    switch (this.updateMode) {
      case UpdateMode.edit: {
        this.componentView = EditDialogComponentView.edit;
        this.getEntityProcess.do();
        break;
      }

      case UpdateMode.add: {
        this.componentView = EditDialogComponentView.edit;
        break;
      }

      case UpdateMode.delete: {
        this.componentView = EditDialogComponentView.delete;
        break;
      }

    }

  }

  abstract getEntityData(): Observable<any> ;

  abstract getUpdatedData(command: string, model: object): Observable<any> ;

  onSpinnerButtonClick() {
    console.error('override FfhViewBase::onSpinnerButtonClick()');
  }

  addAlert(message: string, type: alertType, dismissible?: boolean) {
    if (dismissible ==  null) {
      this.alerts.push({id: this.nextAlertId++, type: type, message: message});
    } else {
      this.alerts.push({id: this.nextAlertId++, type: type, message: message, dismissible: dismissible});
    }
  }

  closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  clearAlerts() {
    this.alerts = [];
    this.nextAlertId = 1;
  }

  handleError(error: any, title?: string) {

    console.error(error);
    this.clearAlerts();
    this.addAlert('error message', alertType.danger, true);
  }

  get getEntityProcess (): ObservableProcess {
    if (this._getEntityProcess == null) {
      this._getEntityProcess = new ObservableProcess(this, 'error getting entity',
        this.getEntityData(),
        this.onGetEntityProccess,
        this.onGetEntityComplete
      );
    }
    return this._getEntityProcess;
  }

  onGetEntityProccess (view: EditDialogBase, data: any) {
    view.data.model = data;
  }

  onGetEntityComplete (view: EditDialogBase) {

  }

  get submitProcess (): ObservableProcessLateBind {
    if (this._submitProcess == null) {
      this._submitProcess = new ObservableProcessLateBind(this, 'error updating');
    }
    return this._submitProcess;
  }

  onSubmitProccess (view: EditDialogBase, data: any) {
    view.data.returnModel = data;
  }

  onSubmitComplete (view: EditDialogBase) {
    if (view.showSummery) {
      view.componentView = EditDialogComponentView.view;
    } else {
      view.dialogRef.close(true);
    }
  }

  onSubmit () {

    switch (this.updateMode) {

      case UpdateMode.add: {

        this.data.prepareApiModel();

        this.submitProcess.doLateBind(
          this.getUpdatedData(this.data.modelId + '-add', this.data.apiModel),
          this.onSubmitProccess,
          this.onSubmitComplete
        );
        break;
      }

      case UpdateMode.edit: {

        this.data.prepareApiModel();

        this.submitProcess.doLateBind(
          this.getUpdatedData(this.data.modelId + '-update', this.data.apiModel),
          this.onSubmitProccess,
          this.onSubmitComplete
        );
        break;
      }


      case UpdateMode.delete: {

        this.data.prepareApiModel();

        this.submitProcess.doLateBind(
          this.getUpdatedData( this.data.modelId + '-delete', this.data.apiModel),
          null,
          () => this.dialogRef.close(true)
        );
        break;
      }
    }
  }

}

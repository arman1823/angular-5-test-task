import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { ObservableProcess} from '../../../../ffh/ffh-shared/infrastructure/observable-process';
import { EditDialogBase, UpdateMode} from '../../../../ffh/ffh-business/infrastructure/edit-dialog-base';

import { SysSitemAllFieldsData} from '../sys-sitem-all-fields.data';
import { SysDepartmentReadModel} from '../../sys-departments/sys-departments.models';
import { SysDepartmentsData} from '../../sys-departments/sys-departments.data';
import { SysGlAccountReadModel} from '../../sys-gl-accounts/sys-gl-accounts.models';
import { SysGlAccountsData} from '../../sys-gl-accounts/sys-gl-accounts.data';


@Component({
  selector: 'app-sys-sitem-all-field-edit-dialog',
  templateUrl: './sys-sitem-all-field-edit-dialog.component.html',
  styleUrls: ['./sys-sitem-all-field-edit-dialog.component.css']
})
export class SysSitemAllFieldEditDialogComponent  extends EditDialogBase implements OnInit {

  private _getDepartmentsProcess: ObservableProcess = null;
  private _getAccountsProcess: ObservableProcess = null;

  isFormShow = true;
  isAddingPlu = false;
  pluToBeAdded = '';
  selectedDepartment: SysDepartmentReadModel = null;
  departments: SysDepartmentReadModel[] = [];
  searchedDepartments: SysDepartmentReadModel[] = [];
  glAccountsAccounts: SysGlAccountReadModel[] = [];

  priceEntries = [
    {id: 0, name: 'Inhibit'},
    {id: 1, name: 'Open'},
    {id: 2, name: 'Preset'},
    {id: 3, name: 'Open & Preset'},
  ];

  constructor (dialogRef: MatDialogRef<EditDialogBase>,
               @Inject(MAT_DIALOG_DATA) data) {

    super(dialogRef, data);
    this.showSummery = true;
  }


  ngOnInit () {
    if (this.updateMode !== UpdateMode.delete) {
      this.getDepartmentsProcess.do();
    }
    if (this.updateMode === UpdateMode.add) {
      this.isFormShow = false;
    }

  }

  getEntityData() {
    return SysSitemAllFieldsData.getSysSitemAllFieldEntityData({sysSitemId: '672d0b16-936c-422f-8fea-11078ec906de'});
  }

  getUpdatedData(command: string, model: object) {
    return SysSitemAllFieldsData.updatedEntityData(command, model);
  }

  onSysDepartmentSelect () {
    if (this.selectedDepartment) {
      this.isFormShow = true;
      this.getAccountsProcess.do();
      // set defaults
      this.data.model['sysDepartmentId'] = this.selectedDepartment.sysDepartmentId;
      this.data.model['incomeAccountId'] = this.selectedDepartment.incomeAccountId;
      this.data.model['tax'] = this.selectedDepartment.tax;
      this.data.model['buttonWidth'] = this.selectedDepartment.buttonWidth;
      this.data.model['textSize'] = this.selectedDepartment.textSize;
      this.data.model['buttonColour'] = this.selectedDepartment.buttonColour;
      this.data.model['textColour'] = this.selectedDepartment.textColour;
    }
  }

  get getDepartmentsProcess (): ObservableProcess {
    if (this._getDepartmentsProcess == null) {
      this._getDepartmentsProcess = new ObservableProcess(this, 'Error reading SysDepartments',
        SysDepartmentsData.getSysDepartmentReadData(),
        this.onGetDepartmentsProcess,
      );
    }
    return this._getDepartmentsProcess;
  }

  onGetDepartmentsProcess (view: SysSitemAllFieldEditDialogComponent, data: any) {
    view.departments = <SysDepartmentReadModel[]> data;
    view.searchedDepartments = view.departments;

  }

  onSearchValueChanged (value) {
    if (value) {
      this.searchedDepartments = this.departments.filter(item => item.name.search(new RegExp(value, 'i')) !== -1);
      this.selectedDepartment = this.searchedDepartments[0];
    } else {
      this.searchedDepartments = this.departments;
    }
  }

  get getAccountsProcess (): ObservableProcess {
    if (this._getAccountsProcess == null) {
      this._getAccountsProcess = new ObservableProcess(this, 'Error reading SysGlAccounts',
        SysGlAccountsData.getSysGlAccountReadData(),
        this.onGetAccountsProcess,
      );
    }
    return this._getAccountsProcess;
  }

  onGetAccountsProcess (view: SysSitemAllFieldEditDialogComponent, data: any) {
    view.glAccountsAccounts = <SysGlAccountReadModel[]> data;
  }


  onDeletePlu (pluToDelete) {
    this.data.model['plus'] = this.data.model['plus'].filter(plu => plu !== pluToDelete);
  }

  onAddPlu () {
    if (this.pluToBeAdded) {
      this.data.model['plus'].push({pluNumber: this.pluToBeAdded});
      this.isAddingPlu = false;
      this.pluToBeAdded = '';
    } else {
      this.pluToBeAdded = 'Can Not Be Empty';
    }
  }

  resetAddingPlu () {
    this.isAddingPlu = false;
    this.pluToBeAdded = '';
  }

  onDescriptionFocus () {
    if (this.updateMode === UpdateMode.add && !this.data.model['shortDescription']) {
      this.data.model['shortDescription'] = this.data.model['name'];
    }
  }


}

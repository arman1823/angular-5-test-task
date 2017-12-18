import {Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import {ISearchOptionModel } from '../../../ffh/ffh-business/infrastructure/business.models';
import {EditDialogData, UpdateMode } from '../../../ffh/ffh-business/infrastructure/edit-dialog-base';
import {SysSitemAllFieldEditDialogComponent} from './sys-sitem-all-field-edit-dialog/sys-sitem-all-field-edit-dialog.component';
import {SysSitemAllFieldReadModel, SysSitemAllFieldAddModel, SysSitemAllFieldModel,
  SysSitemAllFieldUpdateModel, SysSitemAllFieldDeleteModel} from './sys-sitem-all-fields.models';
import {SysSitemAllFieldsData } from './sys-sitem-all-fields.data';
import {BusinessListBase} from '../../../ffh/ffh-business/infrastructure/business-list-base';

@Component({
  selector: 'app-sys-sitem-all-fields',
  templateUrl: './sys-sitem-all-fields.component.html',
  styleUrls: ['./sys-sitem-all-fields.component.css']
})
export class SysSitemAllFieldsComponent extends BusinessListBase<SysSitemAllFieldReadModel> implements OnInit {


  optionModel: ISearchOptionModel = { searchType: 0, searchString: ''};

  constructor(private dialog: MatDialog) {
    super('sys-sitem-all-fields');
  }

  ngOnInit() {
  }

  getReadData() {
    return SysSitemAllFieldsData.getSysSitemAllFieldData();
  }

  onAdd () {
    const defaultApi: SysSitemAllFieldAddModel = new SysSitemAllFieldAddModel();
    defaultApi.plus = [];
    defaultApi.images = [];
    defaultApi.labels = [];
    defaultApi.memberGroups = [];
    defaultApi.prices = [];

    defaultApi.price1 = 0;
    defaultApi.price2 = 0;
    defaultApi.price3 = 0;
    defaultApi.price4 = 0;
    defaultApi.price5 = 0;
    defaultApi.priceEntry = 2;

    defaultApi.kp1 = 0;
    defaultApi.kp2 = 0;
    defaultApi.kp3 = 0;
    defaultApi.kp4 = 0;
    defaultApi.rm1 = 0;
    defaultApi.rm2 = 0;
    defaultApi.qtyTrip1 = 0;
    defaultApi.qtyTrip2 = 0;
    defaultApi.qtyTrip3 = 0;

    defaultApi.imagePosition = 0;
    defaultApi.imageSize = 0;
    defaultApi.imageDefault = true;
    defaultApi.imageStretch = false;
    defaultApi.styleId = 0;
    defaultApi.roundBias = 0;
    defaultApi.wordWrap = false;

    defaultApi.tax = 1;
    defaultApi.scale = false;
    defaultApi.isCondiment = false;
    defaultApi.condimentEntry = false;
    defaultApi.editDescription = false;
    defaultApi.pluStatus = false;
    defaultApi.showClipboard = true;
    defaultApi.enabled = true;
    defaultApi.iDisc = true;
    defaultApi.iTare = -1;
    defaultApi.rcptPrint = true;

    defaultApi.isCondimentChain = false;
    defaultApi.sysCondimentChainId = null;
    defaultApi.sysCondimentTableId = null;
    defaultApi.posPrintGroupId = null;
    defaultApi.sysLabelId = null;
    defaultApi.posImageId = null;

    const editDialogData = new EditDialogData('sys-sitem-all-fields', UpdateMode.add, defaultApi,
      new SysSitemAllFieldAddModel(), new SysSitemAllFieldModel());

    this.dialog.open(SysSitemAllFieldEditDialogComponent, {data: editDialogData})
      .afterClosed()
      .subscribe(confirm => {

      });
  }

  onEdit () {
    if (this.selected === null) {
      return;
    }

    const editDialogData = new EditDialogData(this.modelId, UpdateMode.edit, Object.assign({}, this.selected),
      new SysSitemAllFieldUpdateModel(), new SysSitemAllFieldModel());

    this.dialog.open(SysSitemAllFieldEditDialogComponent, {data: editDialogData})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.searchRefresh();
        }
      });
  }

  onDelete () {
    if (this.selected === null) {
      return;
    }

    const editDialogData = new EditDialogData(this.modelId, UpdateMode.delete, Object.assign({}, this.selected),
      new SysSitemAllFieldDeleteModel(), new SysSitemAllFieldModel());

    this.dialog.open(SysSitemAllFieldEditDialogComponent, {data: editDialogData})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.searchRefresh();
        }
      });

  }
}

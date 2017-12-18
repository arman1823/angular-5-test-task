import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';

import { BusinessSortedBase } from '../../../ffh/ffh-business/infrastructure/business-sorted-base';
import { Observable } from 'rxjs/Observable';
import { EditDialogData, UpdateMode } from '../../../ffh/ffh-business/infrastructure/edit-dialog-base';
import { PosPrintGroupsData } from './pos-print-groups.data';
import { PosPrintGroupReadModel, PosPrintGroupModel, PosPrintGroupAddModel,
  PosPrintGroupUpdateModel, PosPrintGroupDeleteModel } from './pos-print-groups.models';

import { PosPrintGroupEditDialogComponent } from './pos-print-group-edit-dialog/pos-print-group-edit-dialog.component';

@Component({
  selector: 'app-pos-print-groups',
  templateUrl: './pos-print-groups.component.html',
  styleUrls: ['./pos-print-groups.component.css']
})
export class PosPrintGroupsComponent extends BusinessSortedBase<PosPrintGroupReadModel> implements OnInit {

  constructor(private dialog: MatDialog) {
    super('pos-print-groups');
  }

  ngOnInit() {
    this.getAllProcess.do();
  }

  getReadData() {
    return PosPrintGroupsData.getPosPrintGroupReadData();
  }

  onAdd() {
    const defaultApi: PosPrintGroupModel = new PosPrintGroupModel();

    const editDialogData = new  EditDialogData(this.modelId, UpdateMode.add, defaultApi,
      new PosPrintGroupAddModel(), new PosPrintGroupModel());

    this.dialog.open(PosPrintGroupEditDialogComponent, {data: editDialogData})
      .afterClosed()
      .subscribe(confirm => {
        this.getAllProcess.do();
      });
  }

  onEdit() {
    if ( this.selected === null ) {
      return;
    }

    const editDialogData = new  EditDialogData(this.modelId, UpdateMode.edit, Object.assign({}, this.selected),
      new PosPrintGroupUpdateModel(), new PosPrintGroupModel());

    this.dialog.open(PosPrintGroupEditDialogComponent, { data: editDialogData })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.getAllProcess.do();
        }
      });
  }

  onDelete() {
    if (this.selected === null) {
      return;
    }

    const editDialogData = new EditDialogData(this.modelId, UpdateMode.delete, Object.assign({}, this.selected),
      new PosPrintGroupDeleteModel(), new PosPrintGroupModel());

    this.dialog.open(PosPrintGroupEditDialogComponent, {data: editDialogData})
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.getAllProcess.do();
        }
      });

  }
}

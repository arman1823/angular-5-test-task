import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {EditDialogBase} from '../../../../ffh/ffh-business/infrastructure/edit-dialog-base';
import {PosPrintGroupsData} from '../pos-print-groups.data';


@Component({
  selector: 'app-pos-print-group-edit-dialog',
  templateUrl: './pos-print-group-edit-dialog.component.html',
  styleUrls: ['./pos-print-group-edit-dialog.component.css']
})
export class PosPrintGroupEditDialogComponent extends EditDialogBase implements OnInit  {

  constructor(  dialogRef: MatDialogRef<EditDialogBase>,
                @Inject(MAT_DIALOG_DATA) data ) {

    super(dialogRef, data);

  }

  ngOnInit() {

  }

  getEntityData() {
    return PosPrintGroupsData.getPosPrintGroupEntityData({posPrintGroupId: 'f6f7988f-562c-4d13-9504-8cae969dd2a9'});
  }

  getUpdatedData(command: string, model: object) {
    return PosPrintGroupsData.getPosPrintGroupEntityData({posPrintGroupId: 'f6f7988f-562c-4d13-9504-8cae969dd2a9'});
  }

}

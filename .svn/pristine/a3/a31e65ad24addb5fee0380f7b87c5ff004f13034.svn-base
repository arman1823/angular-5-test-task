import {Observable} from 'rxjs/Observable';
import { SysDepartmentReadModel } from './sys-departments.models';

export class SysDepartmentsData {

  static getReadModel(): SysDepartmentReadModel[] {
    return [
      {
        id: '672d0b16-936c-422f-8fea-11078ec906de',
        updateId: new Uint8Array(8),
        sysDepartmentId: '672d0b16-936c-422f-8fea-11078ec906de',
        name: 'Department 1',
        number: 1,
        incomeAccount: 'Sales',
        incomeAccountId: 'cf07c570-c7c5-42cb-9719-a6cff8dc3f1c',
        tax: 1,
        buttonWidth: 2,
        buttonColour: 65535,
        textColour: 0,
        textSize: 14,
        sysLabel: '',
        sysLabelId: ''
      }, {
        id: 'dc43c403-a931-45ee-a5ff-b93e51763256',
        updateId: new Uint8Array(8),
        sysDepartmentId: 'dc43c403-a931-45ee-a5ff-b93e51763256',
        name: 'Department 2',
        number: 2,
        incomeAccount: 'Sales',
        incomeAccountId: 'cf07c570-c7c5-42cb-9719-a6cff8dc3f1c',
        tax: 1,
        buttonWidth: 2,
        buttonColour: 65535,
        textColour: 0,
        textSize: 14,
        sysLabel: '',
        sysLabelId: ''
      }
    ];
  }

  static getSysDepartmentReadData() {
    return Observable.create(observer => {
      observer.next( SysDepartmentsData.getReadModel());
      observer.complete();
    }).delay(500);
  }

}


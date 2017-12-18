import { Observable } from 'rxjs/Observable';
import { PosPrintGroupModel, PosPrintGroupReadModel, PosPrintGroupFindModel } from './pos-print-groups.models';


export class PosPrintGroupsData {

  static getReadModel(): PosPrintGroupReadModel[] {
    return [
      {
        id: 'f6f7988f-562c-4d13-9504-8cae969dd2a9',
        updateId: new Uint8Array(8),
        posPrintGroupId: 'f6f7988f-562c-4d13-9504-8cae969dd2a9',
        number: 1,
        name: 'Print Group 1'
      }, {
        id: '8ad08393-f05b-45d7-ad7b-58c1a6a9f0b5',
        updateId: new Uint8Array(8),
        posPrintGroupId: '8ad08393-f05b-45d7-ad7b-58c1a6a9f0b5',
        number: 2,
        name: 'Print Group 2'
      }
    ];
  }

  static getEntityModel(findModel: PosPrintGroupFindModel ): PosPrintGroupModel {
    return {
        posPrintGroupId: 'f6f7988f-562c-4d13-9504-8cae969dd2a9',
        updateId: new Uint8Array(8),
        number: 1,
        name: 'Print Group 1'
      };
  }


  static getPosPrintGroupReadData() {
    return Observable.create(observer => {
      observer.next( PosPrintGroupsData.getReadModel());
      observer.complete();
    }).delay(500);
  }

  static getPosPrintGroupEntityData(findModel: PosPrintGroupFindModel) {
    return Observable.create(observer => {
      observer.next( PosPrintGroupsData.getEntityModel( findModel));
      observer.complete();
    }).delay(500);
  }

}

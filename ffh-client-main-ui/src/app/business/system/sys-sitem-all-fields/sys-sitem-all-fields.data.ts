import {Observable} from 'rxjs/Observable';
import { SysSitemAllFieldReadModel, SysSitemAllFieldModel,
  SysSitemAllFieldFindModel, SysSitemAllFieldsPluModel,
  SysSitemAllFieldsImageModel, SysSitemAllFieldsLabelModel,
  SysSitemAllFieldsMemberGroupModel, SysSitemAllFieldsPriceModel
} from './sys-sitem-all-fields.models';

export class SysSitemAllFieldsData {

  static getReadModel(): SysSitemAllFieldReadModel[] {
    return [
       {
        id: '672d0b16-936c-422f-8fea-11078ec906de',
        updateId: new Uint8Array(8),
        sysSitemId: '672d0b16-936c-422f-8fea-11078ec906de',
        name: 'Product 1',
        shortDescription: 'Product 1',
        sysDepartment: 'Department 1',
        tax: 0,
        price1: 1,
        price2: 2,
        price3: 3,
        price4: 0,
        price5: 0,
        enabled: true
      }, {
        id: '1abb54f7-a2be-40e9-86e7-28a5e39356bd',
        updateId: new Uint8Array(8),
        sysSitemId: '1abb54f7-a2be-40e9-86e7-28a5e39356bd',
        name: 'Product 2',
        shortDescription: 'Product 2',
        sysDepartment: 'Department 1',
        tax: 0,
        price1: 1,
        price2: 2,
        price3: 3,
        price4: 0,
        price5: 0,
        enabled: true
      }
    ];
  }

  static getEntityModel(findModel: SysSitemAllFieldFindModel ): SysSitemAllFieldModel {
    return {
      updateId: new Uint8Array(8),
      languageUpdateId: new Uint8Array(8),
      sysSitemId: '672d0b16-936c-422f-8fea-11078ec906de',
      name: 'Product 1',
      shortDescription: 'Product 1',
      sysDepartment: 'Department 1',
      sysDepartmentId: '',
      incomeAccount: '',
      incomeAccountId: '',
      tax: 1,
      price1: 1,
      price2: 2,
      price3: 3,
      price4: 0,
      price5: 0,
      priceEntry: 2,
      scale: false,
      isCondiment: false,
      isCondimentChain: false,
      condimentEntry: false,
      editDescription: false,
      pluStatus: true,
      qtyTrip1: 0,
      qtyTrip2: 0,
      qtyTrip3: 0,
      enabled: true,
      iTare: -1,
      iDisc: true,
      sysCondimentTable: '',
      sysCondimentTableId: '',
      sysCondimentChain: '',
      sysCondimentChainId: '',
      sysLabel: '',
      sysLabelId: '',
      kp1: 0,
      kp2: 0,
      kp3: 0,
      kp4: 0,
      rm1: 0,
      rm2: 0,
      rcptPrint: true,
      showClipboard: true,
      buttonWidth: 2,
      buttonColour: 65535,
      textColour: 0,
      textSize: 14,
      styleId: 0,
      roundBias: 0,
      wordWrap: true,
      imagePosition: 0,
      imageSize: 50,
      imageDefault: true,
      imageStretch: false,
      posImageId: '',
      posPrintGroup: '',
      posPrintGroupId: '',

      plus: [],
      images: [],
      labels: [],
      memberGroups: [],
      prices: []
    };
  }

  static getUpdatedModel(command: string, model: object): SysSitemAllFieldModel {
    return {
      updateId: new Uint8Array(8),
      languageUpdateId: new Uint8Array(8),
      sysSitemId: '672d0b16-936c-422f-8fea-11078ec906de',
      name: 'Product 1',
      shortDescription: 'Product 1',
      sysDepartment: 'Department 1',
      sysDepartmentId: '',
      incomeAccount: '',
      incomeAccountId: '',
      tax: 1,
      price1: 1,
      price2: 2,
      price3: 3,
      price4: 0,
      price5: 0,
      priceEntry: 2,
      scale: false,
      isCondiment: false,
      isCondimentChain: false,
      condimentEntry: false,
      editDescription: false,
      pluStatus: true,
      qtyTrip1: 0,
      qtyTrip2: 0,
      qtyTrip3: 0,
      enabled: true,
      iTare: -1,
      iDisc: true,
      sysCondimentTable: '',
      sysCondimentTableId: '',
      sysCondimentChain: '',
      sysCondimentChainId: '',
      sysLabel: '',
      sysLabelId: '',
      kp1: 0,
      kp2: 0,
      kp3: 0,
      kp4: 0,
      rm1: 0,
      rm2: 0,
      rcptPrint: true,
      showClipboard: true,
      buttonWidth: 2,
      buttonColour: 65535,
      textColour: 0,
      textSize: 14,
      styleId: 0,
      roundBias: 0,
      wordWrap: true,
      imagePosition: 0,
      imageSize: 50,
      imageDefault: true,
      imageStretch: false,
      posImageId: '',
      posPrintGroup: '',
      posPrintGroupId: '',

      plus: [],
      images: [],
      labels: [],
      memberGroups: [],
      prices: []
    };
  }

  static getSysSitemAllFieldData() {
    return Observable.create(observer => {
      observer.next( SysSitemAllFieldsData.getReadModel());
      observer.complete();
    }).delay(500);
  }

  static getSysSitemAllFieldEntityData(findModel: SysSitemAllFieldFindModel) {
    return Observable.create(observer => {
      observer.next( SysSitemAllFieldsData.getEntityModel( findModel));
      observer.complete();
    }).delay(500);
  }

  static updatedEntityData(command: string, model: object) {
    return Observable.create(observer => {
      observer.next( SysSitemAllFieldsData.getUpdatedModel(command, model));
      observer.complete();
    }).delay(500);
  }

}

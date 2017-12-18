import { JasonBaseClass, emptyGuid  } from '../../../ffh/ffh-shared/infrastructure/util';
import {IApiModel, IListReadModel} from '../../../ffh/ffh-business/infrastructure/business.models';

export class SysDepartmentModel {
  updateId: Uint8Array;
  languageUpdateId: Uint8Array;
  sysDepartmentId: string = null;
  name: string;
  number: number;
  sysGroup: string;
  sysGroupId: string;
  inventoryAccount: string;
  inventoryAccountId: string;
  cOSAccount: string;
  cOSAccountId: string;
  varianceAccount: string;
  varianceAccountId: string;
  incomeAccount: string;
  incomeAccountId: string;
  tax: number;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  sysLabel: string;
  sysLabelId: string = null;

}

export class SysDepartmentReadModel extends JasonBaseClass implements IListReadModel {

  updateId: Uint8Array;
  sysDepartmentId: string;
  name: string;
  number: number;
  incomeAccount: string;
  incomeAccountId: string;
  tax: number;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  sysLabel: string;
  sysLabelId: string;

  constructor(jsonString: string) {
    super(jsonString);
  }

  get id(): string {
    return this.sysDepartmentId;
  }

}

export class SysDepartmentAddModel implements IApiModel {


  sysDepartmentId: string = null;
  name: string;
  sysGroupId: string;
  inventoryAccountId: string;
  cOSAccountId: string;
  varianceAccountId: string;
  incomeAccountId: string;
  tax: number;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  sysLabelId: string;

  prepare(model: SysDepartmentModel) {
    this.sysDepartmentId = model.sysDepartmentId;
    this.name = model.name;
    this.sysGroupId = model.sysGroupId;

    this.inventoryAccountId = model.inventoryAccountId == null ? emptyGuid() : model.inventoryAccountId;
    this.cOSAccountId = model.cOSAccountId  == null ? emptyGuid() : model.cOSAccountId;
    this.varianceAccountId = model.varianceAccountId == null ? emptyGuid() : model.varianceAccountId;
    this.incomeAccountId = model.incomeAccountId == null ? emptyGuid() : model.incomeAccountId;
    model.tax ? this.tax = 1 : this.tax = 0;
    this.buttonWidth = model.buttonWidth;
    this.buttonColour = model.buttonColour;
    this.textColour = model.textColour;
    this.textSize = model.textSize;
    this.sysLabelId = model.sysLabelId;
  }
}

export class SysDepartmentUpdateModel implements IApiModel {


  updateId: Uint8Array;
  languageUpdateId: Uint8Array;
  sysDepartmentId: string;
  name: string;
  sysGroupId: string;
  inventoryAccountId: string;
  cOSAccountId: string;
  varianceAccountId: string;
  incomeAccountId: string;
  tax: number;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  sysLabelId: string;

  prepare(model: SysDepartmentModel) {
    this.updateId = model.updateId;
    this.languageUpdateId = model.languageUpdateId;
    this.sysDepartmentId = model.sysDepartmentId;
    this.name = model.name;
    this.sysGroupId = model.sysGroupId;
    this.inventoryAccountId = model.inventoryAccountId;
    this.cOSAccountId = model.cOSAccountId;
    this.varianceAccountId = model.varianceAccountId;
    this.incomeAccountId = model.incomeAccountId;
    this.tax = model.tax;
    this.buttonWidth = model.buttonWidth;
    this.buttonColour = model.buttonColour;
    this.textColour = model.textColour;
    this.textSize = model.textSize;
    this.sysLabelId = model.sysLabelId;
  }

}

export class SysDepartmentDeleteModel implements IApiModel {

  updateId: Uint8Array;
  sysDepartmentId: string;

  prepare(model: SysDepartmentModel) {
    this.updateId = model.updateId;
    this.sysDepartmentId = model.sysDepartmentId;

  }

}

export class SysDepartmentMoveModel {

  updateId: Uint8Array;
  sysDepartmentId: string;

}


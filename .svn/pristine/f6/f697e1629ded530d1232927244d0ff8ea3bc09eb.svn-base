import {JasonBaseClass } from '../../../ffh/ffh-shared/infrastructure/util';
import {IApiModel, IListReadModel} from '../../../ffh/ffh-business/infrastructure/business.models';

export class SysGlAccountModel {
  updateId: Uint8Array;
  sysGlAccountId: string = null;
  number: number;
  name: string;
  enabled: boolean;
  typeId: number;
  defaultId: number;
}

export class SysGlAccountReadModel extends JasonBaseClass implements IListReadModel {

  updateId: Uint8Array;
  sysGlAccountId: string;
  typeId: number;
  number: number;
  name: string;
  defaultId: number;

  constructor(jsonString: string) {
    super(jsonString);
  }

  get id(): string {
    return this.sysGlAccountId;
  }

}


export class SysGlAccountAddModel implements IApiModel {


  sysGlAccountId: string = null;
  name: string;
  enabled: boolean;
  typeId: number;
  defaultId: number;

  prepare(model: SysGlAccountModel) {
    this.sysGlAccountId = model.sysGlAccountId;
    this.name = model.name;
    this.enabled = model.enabled;
    this.typeId = model.typeId;
    this.defaultId = model.defaultId;
  }
}

export class SysGlAccountUpdateModel implements IApiModel {


  updateId: Uint8Array;
  sysGlAccountId: string;
  name: string;
  enabled: boolean;
  typeId: number;
  defaultId: number;

  prepare(model: SysGlAccountModel) {
    this.updateId = model.updateId;
    this.sysGlAccountId = model.sysGlAccountId;
    this.name = model.name;
    this.enabled = model.enabled;
    this.typeId = model.typeId;
    this.defaultId = model.defaultId;
  }

}

export class SysGlAccountDeleteModel implements IApiModel {


  updateId: Uint8Array;
  sysGlAccountId: string;

  prepare(model: SysGlAccountModel) {
    this.updateId = model.updateId;
    this.sysGlAccountId = model.sysGlAccountId;

  }

}

export class SysGlAccountMoveModel {

  updateId: Uint8Array;
  sysGlAccountId: string;

}


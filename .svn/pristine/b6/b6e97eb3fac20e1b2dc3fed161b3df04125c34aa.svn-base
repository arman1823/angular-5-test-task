import { JasonBaseClass } from '../../../ffh/ffh-shared/infrastructure/util';
import { IApiModel, IListReadModel } from '../../../ffh/ffh-business/infrastructure/business.models';

export class PosPrintGroupModel {
  updateId: Uint8Array;
  posPrintGroupId: string = null;
  number: number;
  name: string;
}

export class PosPrintGroupReadModel extends JasonBaseClass implements IListReadModel {

  updateId: Uint8Array;
  posPrintGroupId: string;
  number: number;
  name: string;

  constructor(jsonString: string) {
    super(jsonString);
  }

  get id(): string {
    return this.posPrintGroupId;
  }
  set id(value: string) {

  }
}

export class PosPrintGroupAddModel implements IApiModel {

  posPrintGroupId: string;
  name: string;

  prepare(model: PosPrintGroupModel) {
    this.posPrintGroupId = model.posPrintGroupId;
    this.name = model.name;
  }
}

export class PosPrintGroupUpdateModel implements IApiModel {

  updateId: Uint8Array;
  posPrintGroupId: string;
  name: string;

  prepare(model: PosPrintGroupModel) {
    this.updateId = model.updateId;
    this.posPrintGroupId = model.posPrintGroupId;
    this.name = model.name;
  }

}

export class PosPrintGroupDeleteModel implements IApiModel {

updateId: Uint8Array;
  posPrintGroupId: string;

  prepare(model: PosPrintGroupModel) {
    this.updateId = model.updateId;
    this.posPrintGroupId = model.posPrintGroupId;

  }

}

export class PosPrintGroupMoveModel {

  updateId: Uint8Array;
  posPrintGroupId: string;

}

export class PosPrintGroupFindModel {

  posPrintGroupId: string;

}

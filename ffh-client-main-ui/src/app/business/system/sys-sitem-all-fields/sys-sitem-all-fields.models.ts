import { JasonBaseClass } from '../../../ffh/ffh-shared/infrastructure/util';
import {IApiModel, IListReadModel} from '../../../ffh/ffh-business/infrastructure/business.models';

export class SysSitemAllFieldModel {
  updateId: Uint8Array;
  languageUpdateId: Uint8Array;
  sysSitemId: string = null;
  name: string;
  shortDescription: string;
  sysDepartment: string;
  sysDepartmentId: string;
  incomeAccount: string;
  incomeAccountId: string;
  tax: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  priceEntry: number;
  scale: boolean;
  isCondiment: boolean;
  isCondimentChain: boolean;
  condimentEntry: boolean;
  editDescription: boolean;
  pluStatus: boolean;
  qtyTrip1: number;
  qtyTrip2: number;
  qtyTrip3: number;
  enabled: boolean;
  iTare: number;
  iDisc: boolean;
  sysCondimentTable: string;
  sysCondimentTableId: string;
  sysCondimentChain: string;
  sysCondimentChainId: string;
  sysLabel: string;
  sysLabelId: string;
  kp1: number;
  kp2: number;
  kp3: number;
  kp4: number;
  rm1: number;
  rm2: number;
  rcptPrint: boolean;
  showClipboard: boolean;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  styleId: number;
  roundBias: number;
  wordWrap: boolean;
  imagePosition: number;
  imageSize: number;
  imageDefault: boolean;
  imageStretch: boolean;
  posImageId: string;
  posPrintGroup: string;
  posPrintGroupId: string;

  plus: SysSitemAllFieldsPluModel[];
  images: SysSitemAllFieldsImageModel [];
  labels: SysSitemAllFieldsLabelModel [];
  memberGroups: SysSitemAllFieldsMemberGroupModel [];
  prices: SysSitemAllFieldsPriceModel [];
}

export class SysSitemAllFieldReadModel extends JasonBaseClass implements IListReadModel {

  updateId: Uint8Array;
  sysSitemId: string;
  name: string;
  shortDescription: string;
  sysDepartment: string;
  tax: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  enabled: boolean;

  constructor(jsonString: string) {
    super(jsonString);
  }

  get id(): string {
    return this.sysSitemId;
  }
  set id(value) {

  }

}

export class SysSitemAllFieldAddModel implements IApiModel {

  sysSitemId: string;
  name: string;
  shortDescription: string;
  sysDepartmentId: string;
  incomeAccountId: string;
  tax: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  priceEntry: number;
  scale: boolean;
  isCondiment: boolean;
  isCondimentChain: boolean;
  condimentEntry: boolean;
  editDescription: boolean;
  pluStatus: boolean;
  qtyTrip1: number;
  qtyTrip2: number;
  qtyTrip3: number;
  enabled: boolean;
  iTare: number;
  iDisc: boolean;
  sysCondimentTableId: string;
  sysCondimentChainId: string;
  sysLabelId: string;
  kp1: number;
  kp2: number;
  kp3: number;
  kp4: number;
  rm1: number;
  rm2: number;
  rcptPrint: boolean;
  showClipboard: boolean;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  styleId: number;
  roundBias: number;
  wordWrap: boolean;
  imagePosition: number;
  imageSize: number;
  imageDefault: boolean;
  imageStretch: boolean;
  posImageId: string;
  posPrintGroupId: string;

  plus: SysSitemAllFieldsPluModel[];
  images: SysSitemAllFieldsImageModel [];
  labels: SysSitemAllFieldsLabelModel [];
  memberGroups: SysSitemAllFieldsMemberGroupModel [];
  prices: SysSitemAllFieldsPriceModel [];

  prepare(model: SysSitemAllFieldModel) {
    this.sysSitemId = model.sysSitemId;
    this.name = model.name;
    this.shortDescription = model.shortDescription;
    this.sysDepartmentId = model.sysDepartmentId;
    this.incomeAccountId = model.incomeAccountId;
    this.tax = model.tax;
    this.price1 = model.price1;
    this.price2 = model.price2;
    this.price3 = model.price3;
    this.price4 = model.price4;
    this.price5 = model.price5;
    this.priceEntry = model.priceEntry;
    this.scale = model.scale;
    this.isCondiment = model.isCondiment;
    this.isCondimentChain = model.isCondimentChain;
    this.condimentEntry = model.condimentEntry;
    this.editDescription = model.editDescription;
    this.pluStatus = model.pluStatus;
    this.qtyTrip1 = model.qtyTrip1;
    this.qtyTrip2 = model.qtyTrip2;
    this.qtyTrip3 = model.qtyTrip3;
    this.enabled = model.enabled;
    this.iTare = model.iTare;
    this.iDisc = model.iDisc;
    this.sysCondimentTableId = model.sysCondimentTableId;
    this.sysCondimentChainId = model.sysCondimentChainId;
    this.sysLabelId = model.sysLabelId;
    this.kp1 = model.kp1;
    this.kp2 = model.kp2;
    this.kp3 = model.kp3;
    this.kp4 = model.kp4;
    this.rm1 = model.rm1;
    this.rm2 = model.rm2;
    this.rcptPrint = model.rcptPrint;
    this.showClipboard = model.showClipboard;
    this.buttonWidth = model.buttonWidth;
    this.buttonColour = model.buttonColour;
    this.textColour = model.textColour;
    this.textSize = model.textSize;
    this.styleId = model.styleId;
    this.roundBias = model.roundBias;
    this.wordWrap = model.wordWrap;
    this.imagePosition = model.imagePosition;
    this.imageSize = model.imageSize;
    this.imageDefault = model.imageDefault;
    this.imageStretch = model.imageStretch;
    this.posImageId = model.posImageId;
    this.posPrintGroupId = model.posPrintGroupId;

    this.plus = model.plus;
    this.images = model.images;
    this.labels = model.labels;
    this.memberGroups = model.memberGroups;
    this.prices = model.prices;

  }
}

export class SysSitemAllFieldUpdateModel implements IApiModel {

  updateId: Uint8Array;
  languageUpdateId: Uint8Array;
  sysSitemId: string;
  name: string;
  shortDescription: string;
  sysDepartmentId: string;
  incomeAccountId: string;
  tax: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  priceEntry: number;
  scale: boolean;
  isCondiment: boolean;
  isCondimentChain: boolean;
  condimentEntry: boolean;
  editDescription: boolean;
  pluStatus: boolean;
  qtyTrip1: number;
  qtyTrip2: number;
  qtyTrip3: number;
  enabled: boolean;
  iTare: number;
  iDisc: boolean;
  sysCondimentTableId: string;
  sysCondimentChainId: string;
  sysLabelId: string;
  kp1: number;
  kp2: number;
  kp3: number;
  kp4: number;
  rm1: number;
  rm2: number;
  rcptPrint: boolean;
  showClipboard: boolean;
  buttonWidth: number;
  buttonColour: number;
  textColour: number;
  textSize: number;
  styleId: number;
  roundBias: number;
  wordWrap: boolean;
  imagePosition: number;
  imageSize: number;
  imageDefault: boolean;
  imageStretch: boolean;
  posImageId: string;
  posPrintGroupId: string;

  plus: SysSitemAllFieldsPluModel[];
  images: SysSitemAllFieldsImageModel [];
  labels: SysSitemAllFieldsLabelModel [];
  memberGroups: SysSitemAllFieldsMemberGroupModel [];
  prices: SysSitemAllFieldsPriceModel [];

  prepare(model: SysSitemAllFieldModel) {
    this.updateId = model.updateId;
    this.languageUpdateId = model.languageUpdateId;
    this.sysSitemId = model.sysSitemId;
    this.name = model.name;
    this.shortDescription = model.shortDescription;
    this.sysDepartmentId = model.sysDepartmentId;
    this.incomeAccountId = model.incomeAccountId;
    this.tax = model.tax;
    this.price1 = model.price1;
    this.price2 = model.price2;
    this.price3 = model.price3;
    this.price4 = model.price4;
    this.price5 = model.price5;
    this.priceEntry = model.priceEntry;
    this.scale = model.scale;
    this.isCondiment = model.isCondiment;
    this.isCondimentChain = model.isCondimentChain;
    this.condimentEntry = model.condimentEntry;
    this.editDescription = model.editDescription;
    this.pluStatus = model.pluStatus;
    this.qtyTrip1 = model.qtyTrip1;
    this.qtyTrip2 = model.qtyTrip2;
    this.qtyTrip3 = model.qtyTrip3;
    this.enabled = model.enabled;
    this.iTare = model.iTare;
    this.iDisc = model.iDisc;
    this.sysCondimentTableId = model.sysCondimentTableId;
    this.sysCondimentChainId = model.sysCondimentChainId;
    this.sysLabelId = model.sysLabelId;
    this.kp1 = model.kp1;
    this.kp2 = model.kp2;
    this.kp3 = model.kp3;
    this.kp4 = model.kp4;
    this.rm1 = model.rm1;
    this.rm2 = model.rm2;
    this.rcptPrint = model.rcptPrint;
    this.showClipboard = model.showClipboard;
    this.buttonWidth = model.buttonWidth;
    this.buttonColour = model.buttonColour;
    this.textColour = model.textColour;
    this.textSize = model.textSize;
    this.styleId = model.styleId;
    this.roundBias = model.roundBias;
    this.wordWrap = model.wordWrap;
    this.imagePosition = model.imagePosition;
    this.imageSize = model.imageSize;
    this.imageDefault = model.imageDefault;
    this.imageStretch = model.imageStretch;
    this.posImageId = model.posImageId;
    this.posPrintGroupId = model.posPrintGroupId;

    this.plus = model.plus;
    this.images = model.images;
    this.labels = model.labels;
    this.memberGroups = model.memberGroups;
    this.prices = model.prices;

  }

}

export class SysSitemAllFieldDeleteModel implements IApiModel {

  updateId: Uint8Array;
  sysSitemId: string;

  prepare(model: SysSitemAllFieldModel) {
    this.updateId = model.updateId;
    this.sysSitemId = model.sysSitemId;

  }

}

export class SysSitemAllFieldFindModel {

  sysSitemId: string;

}

export class SysSitemAllFieldReadOptionModel {
  searchType: number;
  searchString: string;
}


export class SysSitemAllFieldsPluModel {
  pluOrder: string;
  pluNumber: string;
}


export class SysSitemAllFieldsImageModel {
  number: number;
  imageType: number;
  imageData: any;
  description: string;
}

export class SysSitemAllFieldsLabelModel {
  languageCode: string;
  label1: string;
  label2: string;
  label3: string;
  serveSize: number;
  unitSize: number;
  servePack: number;
  serveSizeFormat: string;
  servePackFormat: string;
  useByDays: number;
  notes: string;
}

export class SysSitemAllFieldsMemberGroupModel {
  sysMemberGroupId: string;
  sysMemberGroup: string;
  enabled: boolean;
  points: number;
}

export class SysSitemAllFieldsPriceModel {
  sysSellingLocationId: string;
  sysSellingLocation: string;
  enabled: boolean;
  defaultPrice: boolean;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
}





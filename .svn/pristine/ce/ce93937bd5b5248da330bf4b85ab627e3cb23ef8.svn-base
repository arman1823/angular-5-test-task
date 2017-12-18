import { Injectable } from '@angular/core';

export class CountryCode {
  constructor(public country: string, public code: string) {

  }
  get display(): string {
    return this.code + ' ' + this.country;
  }
}

@Injectable()
export class CountryService {

  private _countryCodes: CountryCode[] = [
    new CountryCode('Australia', '61'),
    new CountryCode('Brazil', '55'),
    new CountryCode('Canada', '1'),
    new CountryCode('China', '86'),
    new CountryCode('Egypt', '20'),
    new CountryCode('France', '33'),
    new CountryCode('Germany', '49'),
    new CountryCode('Japan', '81'),
    new CountryCode('South Korea', '82'),
    new CountryCode('Spain', '34'),
    new CountryCode('United Kingdom', '44'),
    new CountryCode('United States', '1')
  ];

  constructor() { }

  get countryCodes(): CountryCode[] {
    return this._countryCodes;
  }

}

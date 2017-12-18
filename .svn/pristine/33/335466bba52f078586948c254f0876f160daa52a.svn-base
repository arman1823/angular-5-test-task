export class JasonBaseClass {

  constructor(jsonString: string) {

    const obj = JSON.parse(jsonString);

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this[prop] = obj[prop];
      }
    }
  }
}

export function emptyGuid(): string {
  return '00000000-0000-0000-0000-000000000000';
}

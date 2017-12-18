import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'intToColor'
})
export class IntToColorPipe implements PipeTransform {

    transform (value: any, args?: any): any {
        return '#' + ('000000' + value.toString(16)).slice(-6);
    }

}

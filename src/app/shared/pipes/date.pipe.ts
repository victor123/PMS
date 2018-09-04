import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
})
export class datePipe implements PipeTransform {
    transform(value: string) {
      	 var datePipe = new DatePipe("en");
        value = datePipe.transform(value, 'dd-MM-yyyy  HH:mm');
        return value;
    }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'changecolor'
})
export class Changecolor implements PipeTransform {
  transform(items: string, data: any[]): any {

    if (!items) return [];
    if (!data) return;

    let d = "";

    var val: any[] = data.filter(it => {
      if (it.deploymentCode == items) {
        return it;
      }

    });
    console.log(val)
    if (val.length > 0) {
      d = "rgb(" + val[0]['colourCode'] + ")"

    }
    else
      d = "rgb(216,191,216)";

      console.log(d)
    return d
  }

}
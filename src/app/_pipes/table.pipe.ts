import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'table',
  pure: false
})
export class TablePipe implements PipeTransform {

  transform(obj: Object[]): string {
    console.log("pipe")
    console.log(JSON.stringify(obj))
    return JSON.stringify(obj)
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../_classes/source';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value: any): any[] {
   /* var strings = []
    console.log((value))
    if(value){
        for (let i = 0; i < value.length; i++ ){
          strings.push(value[i].name)
        }
      }
      console.log(strings)
      return strings*/
      return (Object.keys(value))
    }

}

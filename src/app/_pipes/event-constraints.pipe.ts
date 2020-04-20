import { Pipe, PipeTransform } from '@angular/core';
import { Incident } from '../_classes/incident';

@Pipe({
  name: 'eventConstraints'
})
export class EventConstraintsPipe implements PipeTransform {

  constraintsJson = {
    "Unusual Natural Event": {
      "prohibits": ["Actor", "Structure", "Attack", "Technical", "Legal"]
    },
    "Attack": {
      "prohibits": ["Environmental", "Legal"]
    },
    "Technical": {
      "prohibits": ["Legal"]
    },
    "Environmental": {
      "prohibits": ["Legal"]
    }
  }
  

  transform(selectibleEvents: string[], triggeredBy: number, incident: Incident): string[] {
    let triggeredByEvent: string[] = incident.getElementById(triggeredBy);
    if(triggeredBy === undefined || triggeredByEvent === undefined)
      return selectibleEvents;
    let newSelectibleEvents: string[] = [];
    for(let event of selectibleEvents){
      if(this.isEventAllowed(event, triggeredByEvent)){
        newSelectibleEvents.push(event);
      }
    }
    return newSelectibleEvents;
  }

  isEventAllowed(event: string, triggeredBy: string[]): boolean{
    for(let triggeredByEvent of triggeredBy){
      if(!this.constraintsJson[event])
        continue;
      for(let prohibited of this.constraintsJson[event].prohibits){
        if(prohibited === triggeredByEvent){
          console.log("prohibited: " + event);
          return false;
        }
      }
    }
    return true;
  }

}

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import sources from '../_model/sources.json';
import events from '../_model/events.json';
import entities from '../_model/entities.json';
import impacts from '../_model/impacts.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getSources() {
    console.log("getSources")
    return new Observable(subscriber => {
      console.log(sources);
      subscriber.next(sources);
      subscriber.complete();
    })
  }

  getEvents() {
    console.log("getEvents")
    return new Observable(subscriber => {
      subscriber.next(events);
      subscriber.complete();
    })
  }

  getEnities() {
    console.log("getEntities")
    return new Observable(subscriber => {
      subscriber.next(entities);
      subscriber.complete();
    })
  }

  getImpacts() {
    console.log("getImpacts")
    return new Observable(subscriber => {
      subscriber.next(impacts);
      subscriber.complete();
    })
  }
}

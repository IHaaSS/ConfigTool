import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ResolveEnd } from '@angular/router';
import { Source } from '../_classes/source';
import { SelectModel } from '../_classes/select-model';
import { environment } from 'src/environments/environment';

import sources from '../_model/sources.json';
import events from '../_model/events.json';
import entities from '../_model/entities.json';
import impacts from '../_model/impacts.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sourcesObj = new BehaviorSubject<Object[]>(null)
  sources :any; 
  events
  entities

  sourceUrl = environment.baseUrl + '/sources'
  eventsUrl = environment.baseUrl + '/events'
  entitiesUrl = environment.baseUrl + '/entities'
  impactsUrl = environment.baseUrl + '/impacts'

  constructor(private http: HttpClient) { }

  async setData() {
    console.log("setData")
    await this.http.get(this.sourceUrl).subscribe(
      data => {
        this.sources = data;
        console.log(this.sources)
        this.sourcesObj.next(Object.assign({}, this.sources));
      },
      error => console.log('Could not load todos.')
    );
    //this.events = this.http.get<Object[]>(this.eventsUrl)
    //this.entities = this.http.get<Object[]>(this.entities)
  }

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("eeeeeerrrooooor")
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../_classes/incident';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private incident= new BehaviorSubject<Incident>(null); 
  constructor() { }

  public updateIncident(newIncident: Incident) {
    console.log("newIncident")
    console.log(newIncident)
    this.incident.next(newIncident);
  }

  public getIncident(): Observable<Incident> {
    return this.incident.asObservable(); 
  }
}

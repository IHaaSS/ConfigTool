import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../_classes/incident';
import { UserIncident } from '../_classes/user-incident';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private incident= new BehaviorSubject<UserIncident>(null); 
  constructor() { }

  public updateIncident(newIncident: UserIncident) {
    console.log("newIncident")
    console.log(newIncident)
    this.incident.next(newIncident);
  }

  public getIncident(): Observable<UserIncident> {
    return this.incident.asObservable(); 
  }
}

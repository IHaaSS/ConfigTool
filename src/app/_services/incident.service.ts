import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Incident } from '../_classes/incident';
import { catchError, map, tap } from 'rxjs/operators';
import { UserIncident } from '../_classes/user-incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  public incident: Incident = new Incident();
  private incidentsUrl = 'http://127.0.0.1:5000/incidents'
  private userIncidentsUrl = 'http://127.0.0.1:5000/user_incidents'
  private sourcesUrl = 'http://127.0.0.1:5000/sources'
  private transferUrl = 'http://127.0.0.1:5000/transferIncidents'

  constructor(private http: HttpClient) { }

  getIncident(): Incident{
    return this.incident;
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.incidentsUrl).pipe(
      catchError(this.handleError<Incident[]>('getIncidents', []))
    ); 
  }

  getUserIncidents(): Observable<UserIncident[]>{
    return this.http.get<UserIncident[]>(this.userIncidentsUrl).pipe(
      catchError(this.handleError<UserIncident[]>('getUserIncidents', []))
    ); 
  }

  deleteIncident(id:any): Observable<{}> {
    const url = 'this.incidentsUrl/id'
    return this.http.delete(this.incidentsUrl +'/' + id).pipe(
      catchError(this.handleError('deleteIncident'))
    );
  }

  deleteUserIncident(id:any): Observable<{}> {
    return this.http.delete(this.userIncidentsUrl +'/' + id).pipe(
      catchError(this.handleError('deleteIncident'))
    );
  }

  transerferIncident(incident): Observable<Incident> {
    return this.http.post<Incident>(this.transferUrl, incident)
    .pipe(
      catchError(this.handleError('transferUserIncident', incident))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  postIncident(incident: Incident){
    this.http.post(this.incidentsUrl, incident); 
  }

}

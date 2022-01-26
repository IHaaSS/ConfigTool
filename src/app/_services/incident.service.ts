import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Incident } from '../_classes/incident';
import { catchError, map, tap } from 'rxjs/operators';
import { UserIncident } from '../_classes/user-incident';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  public incident: Incident = new Incident();
  private incidentsUrl = environment.baseUrl + '/incidents'
  private userIncidentsUrl = environment.baseUrl + '/user_incidents'
  private transferUrl = environment.baseUrl+'/user_incidents/approve'

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
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post<Incident>(this.transferUrl, incident, options)
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

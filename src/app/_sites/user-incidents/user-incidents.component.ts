import { Component, OnInit } from '@angular/core';
import { UserIncident } from 'src/app/_classes/user-incident';
import { MatTableDataSource } from '@angular/material/table';
import { Incident } from 'src/app/_classes/incident';
import { Observable } from 'rxjs';
import { IncidentService } from 'src/app/_services/incident.service';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/_services/communication.service';

@Component({
  selector: 'app-user-incidents',
  templateUrl: './user-incidents.component.html',
  styleUrls: ['./user-incidents.component.css']
})
export class UserIncidentsComponent implements OnInit {

  displayedColumns: string[] = ['title','sources', 'events', 'entities', 'impact', 'time','email','technicalData'];
  userIncidents: UserIncident[]
  dataSource= new MatTableDataSource<UserIncident>(this.userIncidents);
  selIncident = new Observable<UserIncident>(); 
  stringEvents: String
  stringSources: String
  stringEntities: String

  constructor(private incidentService: IncidentService, private _router:Router, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getAsyncIncidents();
  }

  async getAsyncIncidents(): Promise<void> {
    try{
      const data= await this.incidentService.getUserIncidents().toPromise(); 
      console.log("Data: ");  
      this.userIncidents = data
      console.log(this.userIncidents)
      this.dataSource= new MatTableDataSource<UserIncident>(this.userIncidents)
    }
    catch{
    }
  }

  public getRecord(row: any): void{
    console.log(row)
  }

  public passIncident(row: UserIncident): void {
    this.communicationService.updateIncident(row);
    this._router.navigateByUrl('/detail');
  }

}

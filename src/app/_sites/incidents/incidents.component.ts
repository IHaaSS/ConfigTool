import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/_classes/incident';
import { Observable } from 'rxjs';
import { IncidentService } from 'src/app/_services/incident.service';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/_services/communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { TablePipe } from '../../_pipes/table.pipe';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {

  displayedColumns: string[] = ['title','sources', 'events', 'entities', 'impact', 'time','email','technicalData'];
  userIncidents: Incident[]
  dataSource= new MatTableDataSource<Incident>(this.userIncidents);
  selIncident = new Observable<Incident>(); 
  stringEvents: String
  stringSources: String
  stringEntities: String
  v = JSON.stringify({elements:[{name :"test" , elements:[{name1: "test1"}, {name1:"test1"}]}, {name:"test"},{name:"test"} ]})
  t = JSON.parse(this.v)
  n = {
    "Source": {
     "Actor": {
        "Individual": {
          "Outsider": null,
          "Insider": null,
          "Trusted Insider": null,
          "Privileged Insider": null
        },
        "Group": {
          "Ad hoc": null,
          "Established": null
        },
        "Organization": {
          "Competitor": null,
          "Supplier": null,
          "Partner": null,
          "Customer": null
        },
        "Nation-State": null
      },
      "Structure": {
        "IT Equipment": {
          "Storage": null,
          "Processing": null,
          "Communications": null,
          "Display": null,
          "Sensor": null,
          "Controller": null
        },
        "Environmental Controls": {
          "Temperature/Humidity Controls": null,
          "Power Supply": null
        },
        "Software": {
          "Operating System": null,
          "Networking": null,
          "General-Purpose Application": null,
          "Mission-Sepcific Application": null
        }
      }
    }
  }
  constructor(private incidentService: IncidentService, private _router:Router, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getAsyncIncidents();
  }

  async getAsyncIncidents(): Promise<void> {
    try{
      const data= await this.incidentService.getIncidents().toPromise(); 
      console.log("Data: ");  
      this.userIncidents = data
      console.log(this.userIncidents)
      this.dataSource= new MatTableDataSource<Incident>(this.userIncidents)
    }
    catch{
    }
  }

  public getRecord(row: any): void{
    console.log(row)
  }

  public passIncident(row: Incident): void {
    this.communicationService.updateIncident(row);
    this._router.navigateByUrl('/detail');
  }

}

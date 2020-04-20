import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/_classes/incident';
import { HttpClient } from '@angular/common/http';
import { IncidentService } from 'src/app/_services/incident.service';
import { CommunicationService } from 'src/app/_services/communication.service';

@Component({
  selector: 'app-detail-incident',
  templateUrl: './detail-incident.component.html',
  styleUrls: ['./detail-incident.component.css']
})
export class DetailIncidentComponent implements OnInit {

  myIncident: Incident; 
  subscription; 

  sources;  
  undersources; 
  entities 
  sourceOptions; 
  entitiyOptions; 
  index:number; 
  httpClient: HttpClient; 

  constructor(private communicationService: CommunicationService, private incidentService:IncidentService) {
    this.subscription = this.communicationService.getIncident().
    subscribe(data => this.myIncident = data); 
    console.log(this.myIncident) 
   }

  ngOnInit(): void {
    console.log("onInit") 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public deleteIncident():void{
    console.log(this.myIncident._id.$oid)
    this.incidentService.deleteIncident(this.myIncident._id.$oid).subscribe(); 
  }

  public submitIncident():void {
    //test
  }
}

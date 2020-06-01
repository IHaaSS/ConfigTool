import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/_classes/incident';
import { HttpClient } from '@angular/common/http';
import { IncidentService } from 'src/app/_services/incident.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { DataService } from 'src/app/_services/data.service';
import { UserIncident } from 'src/app/_classes/user-incident';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-incident',
  templateUrl: './detail-incident.component.html',
  styleUrls: ['./detail-incident.component.css']
})
export class DetailIncidentComponent implements OnInit {

  myIncident: UserIncident; 
  subscription; 
  sourcesPanelOpened: boolean[] = [true];
  eventsPanelOpened: boolean[] = [true];
  entitiesPanelOpened: boolean[] = [true]
  impactsPanelOpened: boolean[] = [true]

  sources;  
  undersources; 
  entities 
  sourceOptions; 
  entitiyOptions; 
  index:number; 
  httpClient: HttpClient; 
  sourcesTree: {}
  impactTree:{}
  entitiesTree:{}
  eventsTree:{}
  choices = []

  constructor(private _router:Router, private communicationService: CommunicationService, private incidentService:IncidentService, private dataService: DataService) {
    this.subscription = this.communicationService.getIncident().
    subscribe(data => this.myIncident = data); 
    console.log("myIncident")
    console.log(this.myIncident.sources) 
   }

   ngOnInit(): void {
    console.log("ngOnInit")
    this.getData();
    this.choices[0] = this.sourcesTree
  }

  async getData(): Promise<void> {
    console.log("getAsync")
    const s = await this.dataService.getSources().toPromise();
    let sList = JSON.stringify(s[0])
    let sTemp = JSON.parse(sList)
    this.sourcesTree = sTemp;

    const en = await this.dataService.getEnities().toPromise(); 
    let enList = JSON.stringify(en[0])
    let enTemp = JSON.parse(enList)
    this.entitiesTree = enTemp;
    console.log(this.entitiesTree)

    const ev = await this.dataService.getEvents().toPromise(); 
    let evList = JSON.stringify(ev[0])
    let evTemp = JSON.parse(evList)
    this.eventsTree = evTemp;

    const i = await this.dataService.getImpacts().toPromise(); 
    let iList = JSON.stringify(i[0])
    let iTemp = JSON.parse(iList)
    this.impactTree = iTemp;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public deleteIncident():void{
    console.log(this.myIncident.myId)
    this.incidentService.deleteUserIncident(this.myIncident.myId).subscribe(); 
    this._router.navigateByUrl('/userIncidents');
  }

  public transferIncident():void{
    this.incidentService.transerferIncident(this.myIncident).subscribe();
    this._router.navigateByUrl('/userIncidents');
  }
}

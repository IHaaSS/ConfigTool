import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { Incident, Impact, ImpactDescription } from 'src/app/_classes/incident';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { Source } from 'src/app/_classes/source';
import { SelectModel } from 'src/app/_classes/select-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  myIncident: Incident;
  sourcesPanelOpened: boolean[] = [true];
  eventsPanelOpened: boolean[] = [true];
  entitiesPanelOpened: boolean[] = [true]
  impactsPanelOpened: boolean[] = [true]
  //impactKeys: string[] = Object.keys(Impact);
  //impact = Impact;
  //impactDescription = ImpactDescription;
  done:boolean
  sourcesTree: {}
  impactTree:{}
  entitiesTree:{}
  eventsTree:{}

  loading: boolean = false;

  constructor(private http: HttpClient, private dataService: DataService, private incidentService: IncidentService, private _router:Router) {
  }

  ngOnInit(): void {
    this.done = false
    console.log("ngOnInit")
    this.myIncident = this.incidentService.getIncident()
    this.getData();
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

    this.done = true

  }

  createArray(source){
    for (var i = 0; i < source.length; i++){
      console.log(source[i])
      if (source[i].elements){
        this.sourcesTree[source[i].name] = {}
        this.createArray(source[i].elements)
      } else{
        this.sourcesTree[source[i].name] = null
      }
      console.log(this.sourcesTree)
    }
  }

  /*
      for source in sources['elements']:
        t = 'elements'
        if t in source:
            test = str(prev) + str(source.get("name"))
            travtest(source, test)
            list.append(test)
        else:
            list.append(str(prev) + str(source.get("name")))
  */
  addSource(): void {
    this.addElement(
      this.myIncident.sources,
      this.sourcesPanelOpened,
      { source: [], description: "" })
    console.log("sooooooource")
    console.log(this.myIncident)
  }

  addEvent(): void {
    this.addElement(
      this.myIncident.events,
      this.eventsPanelOpened,
      { event: [], description: "" })
    console.log(this.myIncident)
  }

  addEntity(): void {
    this.addElement(
      this.myIncident.entities,
      this.entitiesPanelOpened,
      { entity: [], description: "" })
    console.log(this.myIncident)
  }

  addElement(elementArray: { description: string }[], openedArray: boolean[], element: any): void {
    if (elementArray.length < openedArray.length)
      openedArray.splice(elementArray.length, openedArray.length)

    openedArray.forEach((_e, i) => { openedArray[i] = false })
    openedArray.push(true);
    this.myIncident.addElement(element);
    console.log("my Incident added Element")
    console.log(this.myIncident)
  }

  postIncident() {
    console.log(JSON.stringify(this.myIncident))
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.http.post('http://127.0.0.1:5000/incidents', JSON.stringify(this.myIncident), { headers: headers, responseType: "text" }).subscribe(
      (val) => {
        console.log(
          val);
        this._router.navigateByUrl('/incidents')

      },
      response => {
        console.log("POST call in error", response);
      }
    );
  }
}

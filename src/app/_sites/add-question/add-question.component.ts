import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/_classes/question';
import { DataService } from 'src/app/_services/data.service';
import { QuestionService } from 'src/app/_services/question.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  myQuestion: Question
  sourcesTree
  impactTree:{}
  entitiesTree:{}
  eventsTree:{}
  done:boolean
  sourcesPanelOpened: boolean[] = [true];
  eventsPanelOpened: boolean[] = [true];
  entitiesPanelOpened: boolean[] = [true]
  impactsPanelOpened: boolean[] = [true]

  constructor( private dataService: DataService, private questionService: QuestionService, private http: HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this.done = false
    this.myQuestion = this.questionService.getQuestion()
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

  addSource(): void {
    this.addElement(
      this.myQuestion.sources,
      this.sourcesPanelOpened,
      { source: [] })
    console.log("sooooooource")
    console.log(this.myQuestion)
  }

  addEvent(): void {
    this.addElement(
      this.myQuestion.events,
      this.eventsPanelOpened,
      { event: []})
    console.log(this.myQuestion)
  }

  addEntity(): void {
    this.addElement(
      this.myQuestion.entities,
      this.entitiesPanelOpened,
      { entity: []})
    console.log(this.myQuestion)
  }

  addImpact(): void {
    this.addElement(
      this.myQuestion.impacts,
      this.entitiesPanelOpened,
      { impact: []})
    console.log(this.myQuestion)
  }


  addElement(elementArray: { }[], openedArray: boolean[], element: any): void {
    if (elementArray.length < openedArray.length)
      openedArray.splice(elementArray.length, openedArray.length)

    openedArray.forEach((_e, i) => { openedArray[i] = false })
    openedArray.push(true);
    this.myQuestion.addElement(element);
    console.log("my Incident added Element")
    console.log(this.myQuestion)
  }

  postIncident() {
    console.log(JSON.stringify(this.myQuestion))
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.http.post('http://127.0.0.1:5000/questions', JSON.stringify(this.myQuestion), { headers: headers, responseType: "text" }).subscribe(
      (val) => {
        console.log(
          val);
          //this._router.navigateByUrl('/incidents')
          location.reload()

      },
      response => {
        console.log("POST call in error", response);
      }
    );
  }
}

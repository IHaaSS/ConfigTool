import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { SelectModel } from 'src/app/_classes/select-model';
import { Incident } from 'src/app/_classes/incident';
import { IncidentService } from 'src/app/_services/incident.service';
import { EventConstraintsPipe } from 'src/app/_pipes/event-constraints.pipe';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: QuestionSelectorComponent,
    multi: true
  }]
})
export class QuestionSelectorComponent implements OnInit {

  @Input() incidentTree: SelectModel;
  @Input() triggeredBy: number;
  @Output() valueChange = new EventEmitter();
  
  incident: Incident;
  choices= [];
  selections: string[] = [];

  elements
  elementsStatus:boolean

  constructor(private incidentService: IncidentService, private cd: ChangeDetectorRef) { 
    
  }

  ngOnInit() {
    console.log("onInit")
    this.incident = this.incidentService.getIncident();
    this.choices[0] = this.incidentTree.elements
    console.log("tree selector component incident tree")
    console.log(Object.values(this.incidentTree)[0])
    console.log(this.choices[0])
    
  }

  selectionChange(value: any, i: number) {
    console.log("selectionChange")
    console.log(value)
    console.log(i)
    console.log(this.selections)
    for (let j = this.selections.length - 2; j > i; j--) {
      this.choices.pop();
      this.selections.pop();
      //this.selections.shift()
    
    }

    if (value === undefined) {
      this.selections.pop();
      this.choices.pop();
      if (this.choices.length == 0)
        //this.choices[0] = this.incidentTree[Object.keys(this.incidentTree)[0]]
        this.choices[0] = this.incidentTree
        console.log(this.choices[0])
    }
    else
      this.selections.pop()
      this.selections[i] = value.name;
      this.selections.push(value.id)
    if (value.elements)
      this.choices[i + 1] = value.elements;
    console.log("dkfgjdlgjdfskjgdksjgjksdfghjkfdsghkjfsdhgjksdfhgjksdfghsdfgh")
    console.log(this.selections)
    this.valueChange.emit(this.selections);
  }

  registerOnTouched(): void {
  }
  registerOnChange(fn: any): void {
    console.log("registerOnChange")
    this.valueChange.subscribe((data: string[]) => fn(data));
  }
  writeValue(value: any): void {
    console.log("writeValue")
    this.selections = value;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges")
    if (changes.triggeredBy) {
      let eventConstraintPipe: EventConstraintsPipe = new EventConstraintsPipe();
      this.selections.forEach((selection, i) => {
        if (!eventConstraintPipe.isEventAllowed(
            selection,
            this.incident.getElementById(changes.triggeredBy.currentValue))) {
          this.selectionChange(undefined, i);
        }
      });
    }
    console.log(this.selections)
  }

}

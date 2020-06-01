import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IncidentsComponent } from './_sites/incidents/incidents.component';
import { UserIncidentsComponent } from './_sites/user-incidents/user-incidents.component';
import { DetailIncidentComponent } from './_sites/detail-incident/detail-incident.component';
import { AddIncidentComponent } from './_sites/add-incident/add-incident.component';
import { AddQuestionComponent } from './_sites/add-question/add-question.component';


const routes: Routes = [
  {path:"", redirectTo: 'incidents',  pathMatch: 'full'},
  { path: 'userIncidents', component: UserIncidentsComponent },
  { path: 'incidents', component:IncidentsComponent,  pathMatch: 'full'},
  { path: 'detail', component:DetailIncidentComponent},
  { path: 'add', component:AddIncidentComponent},
  { path: 'addQuestion', component:AddQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

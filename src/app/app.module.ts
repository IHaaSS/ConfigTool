import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentsComponent } from './_sites/incidents/incidents.component';
import { UserIncidentsComponent } from './_sites/user-incidents/user-incidents.component';
import { DetailIncidentComponent } from './_sites/detail-incident/detail-incident.component';
import { AddIncidentComponent } from './_sites/add-incident/add-incident.component';
import { HeaderComponent } from './_sites/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatInputModule} from '@angular/material/input';

import { TreeSelectorComponent } from './_sites/tree-selector/tree-selector.component';
import { EventConstraintsPipe } from './_pipes/event-constraints.pipe';
import { KeysPipe } from './_pipes/keys.pipe';
import { TablePipe } from './_pipes/table.pipe';


@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    UserIncidentsComponent,
    DetailIncidentComponent,
    AddIncidentComponent,
    HeaderComponent,
    TreeSelectorComponent,
    EventConstraintsPipe,
    KeysPipe,
    TablePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

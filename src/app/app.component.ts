import { Component, OnInit } from '@angular/core';
import { DataService } from './_services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    console.log("App on Init")
    //this.dataService.setData()
    this.load()
  }

  async load() {
    await this.dataService.setData()
  }
  title = 'Tool';
}

import { Component, OnInit } from '@angular/core';
import { PollsService } from '../polls.service';

import { PollComponent } from '../poll-component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends PollComponent implements OnInit {
  

  constructor(
    private pollService: PollsService
  ) {
    super(pollService);
   }
  

  ngOnInit() {    
    this.getPolls();
  }

  getPolls(startIndex: number = 0, endIndex: number = 10): void {
    this.PollsService.getPolls(startIndex, endIndex).subscribe(results => this.handleResults(results));
  } 

}

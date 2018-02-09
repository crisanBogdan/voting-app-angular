import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PollComponent } from '../poll-component';

import { PollsService } from '../polls.service';


@Component({
  selector: 'app-my-polls',
  templateUrl: '../home-page/home-page.component.html',
  styleUrls: ['../home-page/home-page.component.css']
})
export class MyPollsComponent extends PollComponent implements OnInit {

  constructor(
    private pollService: PollsService,
    private route: ActivatedRoute
  ) {
    super(pollService);
  }
  
  ngOnInit() {
    this.getPolls();
  }

  getPolls(startIndex: number = 0, endIndex: number = 10): void {
    const user = this.route.snapshot.paramMap.get('user');

    this.PollsService.getUserPolls(user, startIndex, endIndex)
    .subscribe(results => this.handleResults(results));
  }
}

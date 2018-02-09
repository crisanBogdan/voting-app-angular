import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PollsService } from '../polls.service';

import { Poll } from '../poll.interface';

import Chart from 'chart.js';


@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements OnInit {

  private poll: object = {};

  private errMessage: string;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollsService,
  ) { }

  ngOnInit() {
    this.getPoll();
  }

  getPoll(): void {
    const pollTitle = this.route.snapshot.paramMap.get('title');
    this.pollService.getPoll(pollTitle)
    .subscribe(res => {

      if (res.error) {
        this.errMessage = res.error;
        return;
      }

      this.poll = res;

      this.createChart(res.options);
    })
  }

  submitVote(title: string, option: string): void {
    this.pollService.vote(title, option)
    .subscribe(res => {     

      if (res.error) {
        this.errMessage = res.error;
        return;
      }

      this.poll = res;

      this.createChart(res.options);

    });
  }  

  createChart(options: any[]): void {
    const canvas = <HTMLCanvasElement>document.getElementById("chart");
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.voteLabels(options),
        datasets: [{
          label: '# of Votes',
          data: this.voteData(options),
          backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
       }]
      }
    });
  }

  voteLabels(options: any[]): string[] {
    const labels: string[] = [];
    for (let option of options) {
      labels.push(option.name);
    }
    return labels;
  }

  voteData(options: any[]): number[] {
    const data: number[] = [];
    for (let option of options) {
      data.push(option.votes);
    }
    return data;
  }

}

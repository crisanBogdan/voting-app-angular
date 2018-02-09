import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { PollsService } from '../polls.service';
import { LoginService } from '../login.service';

import { createPoll } from '../poll.interface';

interface PollOption {
  val: string;
}

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  title: string = '';
  options: PollOption[] = [
    {
      val: ''
    },
    {
      val: ''
    },
  ];

  errMessage: string = '';

  constructor(
    private loginService: LoginService,
    private pollsService: PollsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  get optionsStringArr(): string[] {
    const options: string[] = [];

    for (let option of this.options) {
      options.push(option.val);
    }

    return options;
  }

  newOption(): void {
    this.options.push({val: ''});
  }

  validOptions(): string {

    if (!this.title) return 'The poll must have a title.';

    const options = this.optionsStringArr;

    if (options.includes(''))
     return 'Empty option field is not allowed.';

    options.sort();

    for (let i = 0; i < options.length - 1; i++) {
      if (options[i] === options[i + 1])
       return 'Duplicate options are not allowed.';
    }

    return '';
  }

  onSubmit(): void {

    this.errMessage = this.validOptions();
    if (this.errMessage) {       
      return;
    }    

    const poll = createPoll(this.loginService.loggedUsername, this.title, this.optionsStringArr);
    

    this.pollsService.createPoll(poll)
    .subscribe(res => {

      if (res.error) {
        this.errMessage = res.error;
        return;
      }
      
      this.router.navigate(['']);
    })
    
  }

}

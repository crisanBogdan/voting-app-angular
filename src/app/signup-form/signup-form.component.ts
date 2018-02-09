import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from '../signup.service';

import { SignUpUser } from '../user.interface';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {

  constructor(
    private signUpService: SignupService,
    private router: Router
  ) { }

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),   
        this.forbiddenValidator(/\W/)
      ]),
      password: new FormControl('', [
        Validators.required,
        //Validators.minLength(8),
        //this.acceptValidator(/[A-Z]+/),
        //this.acceptValidator(/[0-9]+/)      
      ]),
      email: new FormControl('', [
        Validators.required,
        this.acceptValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])
    });
  }

  submitted = false;

  usernameTaken = false;

  emailTaken = false;
  
  get username() {
    return this.signUpForm.get('username');
  }  
  get password() {
    return this.signUpForm.get('password');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get user() {
    return {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
    }
  }  

  forbiddenValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbidden': {value: control.value}} : null;
    }
  }

  acceptValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const accepted = nameRe.test(control.value);
      return accepted ? null : {'forbidden': {value: control.value}};
    }
  }

  validUser(): boolean {
    return this.username.valid && this.password.valid && this.email.valid;
  }

  
  onSubmit() {
    this.submitted = true;

    if (!this.validUser()) return;

    this.signUpService.emailExists(this.email.value)
    .then(res => this.emailTaken = res)      
    .then(() => this.signUpService.usernameExists(this.username.value))
    .then(res => this.usernameTaken = res)
    .then(() => {
      if (!this.usernameTaken && !this.emailTaken) {
        this.signUpService.createUser(this.user).subscribe();
        this.router.navigate(['/account-created']);
      }
    });   
  }
}

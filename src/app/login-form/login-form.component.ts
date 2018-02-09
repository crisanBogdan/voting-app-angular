import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  submitted = false;

  invalidLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,   
      ]),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get user() {
    return {
      username: this.username.value,
      password: this.password.value
    };
  }
  

  onSubmit() {
    this.submitted = true;

    if (!this.username.valid || !this.password.valid) return;

    this.loginService.login(this.user)
    .subscribe(res => {
      
      if (res.error) {
        this.invalidLogin = true;
        return;
      }
      
      this.invalidLogin = false;
      this.router.navigate(['']);
    });
  }
 
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { AccountCreatedComponent } from '../account-created/account-created.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { CreatePollComponent } from '../create-poll/create-poll.component';
import { PollDetailComponent } from '../poll-detail/poll-detail.component';
import { MyPollsComponent } from '../my-polls/my-polls.component';

const appRoutes : Routes = [
  { path: 'sign-up', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },  
  { path: 'account-created', component: AccountCreatedComponent },  
  { path: 'create-poll', component: CreatePollComponent },  
  { path: 'poll/:title', component: PollDetailComponent },  
  { path: 'my-polls/:user', component: MyPollsComponent },  
  { path: '', component: HomePageComponent },  
  { path: '**', redirectTo: '/home', pathMatch: 'full' },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

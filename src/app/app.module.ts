import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { SignupService } from './signup.service';
import { LoginService } from './login.service';
import { PollsService } from './polls.service';


import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { NavComponent } from './nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { FooterComponent } from './footer/footer.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    AccountCreatedComponent,
    NavComponent,
    HomePageComponent,
    CreatePollComponent,
    PollDetailComponent,
    MyPollsComponent,
    FooterComponent
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CookieModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [ SignupService, LoginService, PollsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

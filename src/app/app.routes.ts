import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AllMeetupsComponent} from "./all-meetups/all-meetups.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./guards/auth.guard";
import {MyMeetupsComponent} from "./my-meetups/my-meetups.component";
import {MeetupEntryComponent} from "./meetup-entry/meetup-entry.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {adminGuard} from "./guards/admin.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'all-meetups',
    title: 'all-meetups',
    canActivate: [authGuard],
    component: AllMeetupsComponent,
  },
  {
    path: 'login',
    // pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    // pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'my-meetups',
    component: MyMeetupsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'meetup-entry',
    component: MeetupEntryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [adminGuard]
  }
];

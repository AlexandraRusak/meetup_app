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
import {EditMeetupComponent} from "./edit-meetup/edit-meetup.component";
import {UserEditFormComponent} from "./user-edit-form/user-edit-form.component";

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
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'my-meetups',
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: MyMeetupsComponent,
        canActivate: [authGuard]
      },
      {
        path: "edit-meetup",
        component: EditMeetupComponent,
        canActivate: [authGuard]
      },
      {
        path: 'meetup-entry',
        component: MeetupEntryComponent,
        canActivate: [authGuard],
      }]
  },
  {
    path: 'all-users',
    canActivate: [adminGuard],
    children: [
      {
       path: "",
       component: AllUsersComponent,
        canActivate: [adminGuard],
      },
      {
        path: "user-edit",
        component: UserEditFormComponent,
        canActivate: [adminGuard],
      }

    ]
  }
];

import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoginService} from "../services/login.service";
import {MeetupServiceService} from "../services/meetup-service.service";
import {map, Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {IUser} from "../interfaces/iuser";

@Component({
  selector: 'app-my-meetups',
  standalone: true,
  imports: [
    RouterLink,
    MeetupRecordComponent,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './my-meetups.component.html',
  styleUrl: './my-meetups.component.scss'
})
export class MyMeetupsComponent implements OnInit{

  // meetupList: Array<IMeetupRecord> = [];

  constructor(private loginService: LoginService) {
  }

  meetupService: MeetupServiceService = inject(MeetupServiceService);


  ngOnInit() {
    this.meetupService.fetchList()
  }

  get myMeetupsList () {
    return this.meetupService.meetupList.pipe(map(value => value.filter((value:any)=>value.createdBy === this.loginService.userId)))
  }

}

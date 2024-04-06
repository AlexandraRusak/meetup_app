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

  constructor(private loginService: LoginService,
              // private meetupService: MeetupServiceService,
              private cdr: ChangeDetectorRef) {
  }

  // private destroy: Subject<void> = new Subject();
  meetupService: MeetupServiceService = inject(MeetupServiceService);


  ngOnInit() {
  //   console.log("component init")
  // this.meetupService.getMeetupsData$()
  //   .pipe(tap(res =>console.log("tap called")))
  //   this.cdr.markForCheck();
    this.meetupService.fetchList()
  }

  // private subscription: Subscription | undefined;
  // public renderMyMeetups() {
  //   // console.log(this.loginService.userId)
  //   this.subscription = this.meetupService.requestMeetups()
  //     .pipe(map(values => values.filter((value: any) => value.createdBy === this.loginService.userId)))
  //     .subscribe(result => {
  //       this.meetupList = result
  //       this.cdr.markForCheck()
  //       })
  //
  // }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //     console.log('unsubscribe');
  //   }
  // }

  //  ngOnDestroy(): void {
  //   this.destroy.next();
  //   this.destroy.complete();
  // }



}

import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MeetupServiceService} from "../services/meetup-service.service";
import {filter, map, tap, Observable, Subscription} from "rxjs";
import {LoginService} from "../services/login.service";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {IUser} from "../interfaces/iuser";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-all-meetups',
  standalone: true,
  imports: [
    MeetupRecordComponent,
    NgForOf
  ],
  templateUrl: './all-meetups.component.html',
  styleUrl: './all-meetups.component.scss'
})
export class AllMeetupsComponent {

  meetupList: Array<IMeetupRecord> = [];

  constructor(private loginService: LoginService,
              private meetupService: MeetupServiceService,
              private cdr: ChangeDetectorRef) {
  }
  //
  // ngOnInit() {
  //   this.renderAllMeetups()
  // }
  //
  // private subscription: Subscription | undefined;
  // public renderAllMeetups() {
  //   // console.log(this.loginService.userId)
  //   this.subscription = this.meetupService.requestMeetups()
  //     // .pipe(map(values => values.filter((value: any) => value.createdBy === this.loginService.userId)))
  //     .subscribe(result => {
  //       this.meetupList = result
  //       this.cdr.markForCheck()
  //     })
  //
  // }
  //
  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //     console.log('unsubscribe');
  //   }
  // }

}

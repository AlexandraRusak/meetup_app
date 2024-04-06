import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoginService} from "../services/login.service";
import {MeetupServiceService} from "../services/meetup-service.service";
import {map} from "rxjs";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf} from "@angular/common";


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
export class MyMeetupsComponent implements OnInit, OnDestroy{

  // meetupList: Array<IMeetupRecord> = [];

  constructor(private loginService: LoginService) {
  }

  meetupService: MeetupServiceService = inject(MeetupServiceService);


  ngOnInit() {
    this.refresh()
  }



  get myMeetupsList () {
    return this.meetupService.meetupList.pipe(map(value => value.filter((value:any)=>value.createdBy === this.loginService.userId)))
  }

  timerId: any

  refresh () {
     this.meetupService.fetchList()
    // @ts-ignore
    this.timerId = setTimeout(() => {
      this.refresh();
    },30000)
  }

ngOnDestroy(){
  clearTimeout(this.timerId);
}

}

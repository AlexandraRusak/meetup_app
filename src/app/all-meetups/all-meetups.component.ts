import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MeetupServiceService} from "../services/meetup-service.service";
import {filter, map, tap, Observable, Subscription} from "rxjs";
import {LoginService} from "../services/login.service";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {IUser} from "../interfaces/iuser";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-all-meetups',
  standalone: true,
  imports: [
    MeetupRecordComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './all-meetups.component.html',
  styleUrl: './all-meetups.component.scss'
})
export class AllMeetupsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  meetupService: MeetupServiceService = inject(MeetupServiceService);


  ngOnInit() {
    this.meetupService.fetchList()
  }

}

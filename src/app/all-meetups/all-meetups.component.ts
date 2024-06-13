import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MeetupServiceService} from "../services/meetup-service.service";
import {LoginService} from "../services/login.service";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-all-meetups',
  standalone: true,
  imports: [
    MeetupRecordComponent,
    NgForOf,
    AsyncPipe,
    SearchBarComponent,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './all-meetups.component.html',
  styleUrl: './all-meetups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMeetupsComponent implements OnInit {

  constructor(public meetupService: MeetupServiceService) { }

  ngOnInit() {
    this.meetupService.clearFilter()
    this.refresh()
  }


  timerId: any

  refresh () {
    this.meetupService.fetchList()
    this.timerId = setTimeout(() => {
      // this.refresh();
      this.meetupService.fetchList()
    },60000)
  }

  ngOnDestroy(){
    clearTimeout(this.timerId);
  }

}

// ,
// map(value => value.filter(meetupRecord => meetupRecord.owner !== null))

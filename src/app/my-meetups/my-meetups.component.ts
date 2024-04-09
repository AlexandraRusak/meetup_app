import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../services/login.service";
import {MeetupServiceService} from "../services/meetup-service.service";
import {map} from "rxjs";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {EditMeetupComponent} from "../edit-meetup/edit-meetup.component";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-my-meetups',
  standalone: true,
  imports: [
    RouterLink,
    MeetupRecordComponent,
    NgForOf,
    AsyncPipe,
    RouterOutlet,
    EditMeetupComponent,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './my-meetups.component.html',
  styleUrl: './my-meetups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMeetupsComponent implements OnInit, OnDestroy{

  constructor(private loginService: LoginService, private router: Router) {
  }

  meetupService: MeetupServiceService = inject(MeetupServiceService);


  ngOnInit() {
    this.meetupService.clearFilter()
    this.refresh()
  }



  get myMeetupsList () {
    return this.meetupService.meetupList.pipe(
      map(value => value.filter((value:any)=>value.createdBy === this.loginService.userId)))
  }

  timerId: any

  refresh () {
    this.meetupService.fetchList()
    // @ts-ignore
    this.timerId = setTimeout(() => {
      this.refresh();
    },60000)
    // this.cdr.markForCheck();
  }

  // dataToEdit: IMeetupRecord | undefined
  //
  // // TODO: отработка ошибок и ситуации, когда не найден нужный митап
  // findMeetup(meetupId: string) {
  //   console.log(meetupId)
  //   this.myMeetupsList.pipe(map(values => values.filter(value => value.id === Number(meetupId))))
  //     .subscribe({
  //       next: receivedItem => {
  //       console.log(receivedItem)
  //       this.dataToEdit = receivedItem[0]
  //       console.log(this.dataToEdit)
  //       this.router.navigate(['my-meetups/edit-meetup'])
  //     }})
  // }

ngOnDestroy(){
  clearTimeout(this.timerId);
}

}

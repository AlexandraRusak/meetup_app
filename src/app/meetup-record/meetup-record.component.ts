import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {IUser} from "../interfaces/iuser";
import {NgIf} from "@angular/common";
import {MeetupServiceService} from "../services/meetup-service.service";
import {LoginService} from "../services/login.service";
import {AddUserToMeetup} from "../interfaces/add-user-to-meetup";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-meetup-record',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './meetup-record.component.html',
  styleUrl: './meetup-record.component.scss'
})
export class MeetupRecordComponent implements OnInit {

  meetupService = inject(MeetupServiceService)
  loginService = inject(LoginService)
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  data!: IMeetupRecord;
  _startDate!: Date;
  _endDate!: Date;
  // status!:"planned" | "running" | "finished";
  expected:boolean = true;
  public isVisible = false;
  public iCanGo: boolean = false;
  public iCanEdit: boolean = false;
  public committed: boolean = false;

  ngOnInit() {
    // console.log(this.loginService.userId)
    // console.log(this.data.createdBy)
    this._startDate = new Date(this.data.time)
    this._endDate = new Date(this._startDate.getTime() + this.data.duration*60000)
    const now = new Date()
    // this.status = "planned"
    this.expected = true
    if (now>this._startDate) {
      // this.status = "finished"
      this.expected = false
    }
    // } else if (now > this._startDate) {
    //   this.status = "running"
    // }
    this.checkIfICanGo()
    this.checkIfICanEdit()
    this.checkIfICommitted()
    // this.cdr.markForCheck();
  }

  get startTime(): string {
    return this._startDate.toLocaleString()
  }

  get endTime(): string {
    return this._endDate.toLocaleString()
  }

  checkIfICanGo() {
    if (this.data.createdBy != this.loginService.userId) {
      if (!this.committed) {
        this.iCanGo = true
      }
    }

  }

  checkIfICanEdit() {
   if (this.data.createdBy == this.loginService.userId) {
      this.iCanEdit = true
    }
  }

  checkIfICommitted() {
      if(this.data.users.find(user => user.id === this.loginService.userId)) {
      this.committed = true
    }
  }

  handleIllGo (){
    const obj: AddUserToMeetup = {
      idMeetup: this.data.id,
      idUser: Number(this.loginService.userId)
    }
    this.meetupService.addUserToMeetup(obj)
    // this.cdr.markForCheck();
  }

  handleIamNotGoing () {
    const obj: AddUserToMeetup = {
      idMeetup: this.data.id,
      idUser: Number(this.loginService.userId)
    }
    this.meetupService.deleteUserfromMeetup(obj)
    // this.cdr.markForCheck();
  }

  // @Output()
  // public editEvent = new EventEmitter();
  handleEditClick($event: any) {
    console.log($event.target.id)
    // routerLink="/my-meetups/edit-meetup"
    this.meetupService.fetchMeetup($event.target.id)
  }

  handleDeleteClick($event: any) {
    console.log($event.target.id)
    // routerLink="/my-meetups/edit-meetup"
    this.meetupService.deleteMeetup($event.target.id)
  }

}

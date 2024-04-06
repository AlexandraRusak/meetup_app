import {Component, Input} from '@angular/core';
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {IUser} from "../interfaces/iuser";


@Component({
  selector: 'app-meetup-record',
  standalone: true,
  imports: [],
  templateUrl: './meetup-record.component.html',
  styleUrl: './meetup-record.component.scss'
})
export class MeetupRecordComponent {
  @Input()
  data!: IMeetupRecord;
  _startDate!: Date;
  _endDate!: Date;
  status!:"planned" | "running" | "finished";

  ngOnInit() {
    // console.log(typeof this.data.time)
    this._startDate = new Date(this.data.time)
    this._endDate = new Date(this._startDate.getTime() + this.data.duration*60000)
    const now = new Date()
    this.status = "planned"
    if (now>this._endDate){
      this.status = "finished"
    } else if (now > this._startDate) {
      this.status = "running"
    }
  }

  get startTime(): string {
    return this._startDate.toLocaleString()
  }

  get endTime(): string {
    return this._endDate.toLocaleString()
  }

}

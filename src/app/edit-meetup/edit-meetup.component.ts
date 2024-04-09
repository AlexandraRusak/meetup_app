import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {formatDate, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MeetupServiceService} from "../services/meetup-service.service";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {Observable, Subject, takeUntil} from "rxjs";
import {MatFormField, MatHint, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {IUser} from "../interfaces/iuser";

@Component({
  selector: 'app-edit-meetup',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    ReactiveFormsModule,
    MatHint,
    MatSuffix,
    MatInput,
    MatFormField
  ],
  templateUrl: './edit-meetup.component.html',
  styleUrl: './edit-meetup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMeetupComponent implements OnDestroy {

  private destroy: Subject<void> = new Subject();
  editMeetupForm: FormGroup
  meetupToEdit!: IMeetupRecord;



   get dataToEdit(): IMeetupRecord {
    this.meetupService.meetupToEdit
      .pipe(takeUntil(this.destroy))
      .subscribe(values =>{
      // console.log(values)
      this.meetupToEdit = values[0]
    })
    return this.meetupToEdit
  }

  constructor (private formBuilder: FormBuilder,
               public meetupService: MeetupServiceService) {



     this.editMeetupForm = new FormGroup ({
      name: new FormControl (`${this.dataToEdit.name}`, [Validators.required]),
      description: new FormControl (`${this.dataToEdit.description}`, [Validators.required]),
      time: new FormControl (formatDate(this.dataToEdit.time, 'yyyy-MM-ddTHH:mm', 'en'), [Validators.required]),
      duration: new FormControl (Number(`${this.dataToEdit.duration}`), [Validators.required]),
      location: new FormControl (`${this.dataToEdit.location}`, [Validators.required]),
      target_audience: new FormControl (`${this.dataToEdit.target_audience}`, [Validators.required]),
      need_to_know: new FormControl (`${this.dataToEdit.need_to_know}`, [Validators.required]),
      will_happen: new FormControl (`${this.dataToEdit.will_happen}`, [Validators.required]),
      reason_to_come: new FormControl (`${this.dataToEdit.reason_to_come}`, [Validators.required])
    })
  }

  onSubmit() {
    this.editMeetupForm.markAllAsTouched()
    if (this.editMeetupForm.invalid) {
      return;
    }

    const meetupEntry: MeetupEntry = {
      name: `${this.editMeetupForm.value.name}`,
      description: `${this.editMeetupForm.value.description}`,
      time: new Date(`${this.editMeetupForm.value.time}`).toISOString(),
      duration: Number(this.editMeetupForm.value.duration),
      location: `${this.editMeetupForm.value.location}`,
      target_audience: `${this.editMeetupForm.value.target_audience}`,
      need_to_know: `${this.editMeetupForm.value.need_to_know}`,
      will_happen: `${this.editMeetupForm.value.will_happen}`,
      reason_to_come: `${this.editMeetupForm.value.reason_to_come}`,
    }
    console.log("value sent")
    console.log(this.editMeetupForm.value)
    console.log(meetupEntry)
    this.meetupService.editMeetup(this.dataToEdit.id, meetupEntry)
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}

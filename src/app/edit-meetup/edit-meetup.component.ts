import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MeetupServiceService} from "../services/meetup-service.service";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-meetup',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './edit-meetup.component.html',
  styleUrl: './edit-meetup.component.scss'
})
export class EditMeetupComponent {

  editMeetupForm: FormGroup

  meetupToEdit!: IMeetupRecord;

  // TODO: почему консоль выводит по 5 раз полученные данные, плюс обработать ошибки
  get dataToEdit(): IMeetupRecord {
    this.meetupService.meetupToEdit.subscribe(values =>{
      console.log(values)
      this.meetupToEdit = values[0]
    })
    return this.meetupToEdit
  }

  constructor (private formBuilder: FormBuilder,
               public meetupService: MeetupServiceService) {

    // TODO: сделать правильное отображение даты и времени в форме

    // this.dataToEdit = {
    //   createdAt: "string",
    //   createdBy: 115,
    //   name: "RxJS",
    //   description: "Расскажем об основах RxJS",
    //   time: new Date("2024-03-25T08:41:36.944Z"),
    //   duration: 90,
    //   location: "Переговорка 4",
    //   target_audience: "Разработчики, аналитики",
    //   need_to_know: "Ядренную физику",
    //   will_happen: "Будем готовить пиццу",
    //   reason_to_come: "Надо",
    //   id: 90,
    //   owner: {
    //     id: 999,
    //     email: "string",
    //     fio: "string",
    //     createdAt: "string"
    //   },
    //   updatedAt: "string",
    //   users: []
    // }

    this.editMeetupForm = new FormGroup ({
      name: new FormControl (`${this.dataToEdit.name}`, [Validators.required]),
      description: new FormControl (`${this.dataToEdit.description}`, [Validators.required]),
      time: new FormControl (new Date(`${this.dataToEdit.time}`), [Validators.required]),
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
    console.log(meetupEntry)
    this.meetupService.editMeetup(this.dataToEdit.id, meetupEntry)
  }

}

import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
// import {LoginService} from "../services/login.service";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {MeetupServiceService} from "../services/meetup-service.service";

@Component({
  selector: 'app-meetup-entry',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './meetup-entry.component.html',
  styleUrl: './meetup-entry.component.scss'
})
export class MeetupEntryComponent {

  createMeetupForm!: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    time: FormControl<string | null>;
    // m_date: FormControl<string | null>;
    duration: FormControl<number | null>;
    location: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
  }>;

  constructor (private formBuilder: FormBuilder,
               public meetupService: MeetupServiceService) {  }

  ngOnInit() {
    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createMeetupForm.controls;
  }

  initForm() {
    this.createMeetupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      time: ['', [Validators.required]],
      // m_date: ['', [Validators.required]],
      duration: [0, [Validators.required]],
      location: ['', [Validators.required]],
      target_audience: ['', [Validators.required]],
      need_to_know: ['', [Validators.required]],
      will_happen: ['', [Validators.required]],
      reason_to_come: ['', [Validators.required]],
    })
  }


    onSubmit() {
      if (this.createMeetupForm.invalid) {
        console.log("form invalid")

        /** Обрабатываем ошибку и прерываем выполнение метода*/
        return;
      }

      const meetupEntry: MeetupEntry = {
        name: `${this.createMeetupForm.value.name}`,
        description: `${this.createMeetupForm.value.description}`,
        time: new Date(`${this.createMeetupForm.value.time}`).toISOString(),
        duration: Number(this.createMeetupForm.value.duration),
        location: `${this.createMeetupForm.value.location}`,
        target_audience: `${this.createMeetupForm.value.target_audience}`,
        need_to_know: `${this.createMeetupForm.value.need_to_know}`,
        will_happen: `${this.createMeetupForm.value.will_happen}`,
        reason_to_come: `${this.createMeetupForm.value.reason_to_come}`,
      }
      console.log("value sent")
      console.log(meetupEntry)
      this.meetupService.createMeetup(meetupEntry)
    }
}




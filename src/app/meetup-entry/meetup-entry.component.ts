import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {MeetupServiceService} from "../services/meetup-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-meetup-entry',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './meetup-entry.component.html',
  styleUrl: './meetup-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupEntryComponent {

  createMeetupForm: FormGroup

  constructor (private formBuilder: FormBuilder,
               public meetupService: MeetupServiceService) {

    this.createMeetupForm = new FormGroup ({
      name: new FormControl ("", [Validators.required]),
      description: new FormControl ("", [Validators.required]),
      time: new FormControl ("", [Validators.required]),
      duration: new FormControl (0, [Validators.required]),
      location: new FormControl ("", [Validators.required]),
      target_audience: new FormControl ("", [Validators.required]),
      need_to_know: new FormControl ("", [Validators.required]),
      will_happen: new FormControl ("", [Validators.required]),
      reason_to_come: new FormControl ("", [Validators.required])
    })
  }

    onSubmit() {
    this.createMeetupForm.markAllAsTouched()
      if (this.createMeetupForm.invalid) {
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




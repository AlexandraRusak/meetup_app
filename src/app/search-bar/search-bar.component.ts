import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../interfaces/user";
import {MeetupServiceService} from "../services/meetup-service.service";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private meetupService = inject(MeetupServiceService)

  searchForm: FormGroup

  constructor () {

    this.searchForm = new FormGroup({
      search: new FormControl(""),
     })
  }

  onSubmit() {
    this.meetupService.fetchFilteredList(this.searchForm.controls['search'].value)
  }
}

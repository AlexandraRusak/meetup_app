import {Component, Input} from '@angular/core';
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  @Input()
  data!: InfoUserAdmin;


}

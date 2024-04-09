import {Component, inject, Input} from '@angular/core';
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {NgForOf} from "@angular/common";
import {MeetupServiceService} from "../services/meetup-service.service";
import {LoginService} from "../services/login.service";
import {AdminService} from "../services/admin.service";

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

  adminService = inject(AdminService)


  @Input()
  data!: InfoUserAdmin;

  handleEditEvent($event:any) {
    this.adminService.fetchUser($event.currentTarget.id)
  }
  handleDeleteEvent($event: any) {
    this.adminService.deleteUser($event.currentTarget.id)

  }

}

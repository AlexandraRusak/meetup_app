import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {AdminService} from "../services/admin.service";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserInfoComponent} from "../user-info/user-info.component";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    MeetupRecordComponent,
    NgForOf,
    UserInfoComponent,
    AsyncPipe
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit {

  usersList: Array<InfoUserAdmin> = [];

  constructor(public adminService: AdminService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.adminService.fetchList()
    this.adminService.fetchRolesList()
  }
  //
  // private subscription: Subscription | undefined;
  // public renderAllUsers() {
  //    this.subscription = this.adminService.requestUsers()
  //     // .pipe(map(values => values.filter((value: any) => value.createdBy === this.loginService.userId)))
  //     .subscribe(result => {
  //       this.usersList = result
  //       console.log(this.usersList)
  //       this.cdr.markForCheck()
  //     })
  //
  // }
  //
  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //     console.log('unsubscribe');
  //   }
  // }

}

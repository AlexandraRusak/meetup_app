import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {AdminService} from "../services/admin.service";
import {MeetupRecordComponent} from "../meetup-record/meetup-record.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserInfoComponent} from "../user-info/user-info.component";
import {MatPaginator, MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    MeetupRecordComponent,
    NgForOf,
    UserInfoComponent,
    AsyncPipe,
    NgIf,
    MatPaginator,
    MatProgressSpinner,
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{provide: MatPaginatorIntl, useClass: AllUsersComponent}],
})
export class AllUsersComponent implements OnInit {

  constructor(public adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.fetchList()
  }

  onPageChange(event: PageEvent) {
    this.adminService.setPagination(
      event.pageSize,
      event.pageIndex)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {User} from "../interfaces/user";
import {environment} from "../../environments/environment";
import {Token} from "./login.service";
import {BehaviorSubject, map, Observable, ReplaySubject, Subscription, tap} from "rxjs";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {AddUserToMeetup} from "../interfaces/add-user-to-meetup";

@Injectable({
  providedIn: 'root'
})
export class MeetupServiceService {

  private meetupsData$: BehaviorSubject<Array<IMeetupRecord>> = new BehaviorSubject<Array<IMeetupRecord>>([])

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  fetchList() {
    this.httpClient.get<IMeetupRecord[]>(`${environment.baseUrl}/meetup`)
      .subscribe(receivedItems => this.meetupsData$.next(receivedItems));
  }

  get meetupList(): Observable<IMeetupRecord[]> {
    return this.meetupsData$.asObservable()
  }

  public createMeetup(meetupEntry: MeetupEntry): void {
    // console.log("value received")
    // console.log(meetupEntry)
    this.httpClient
      .post<any>(`${environment.baseUrl}/meetup`, meetupEntry)
      .subscribe({
        next: value => {
          console.log(value)
          console.log(value.createdBy)
        },
        error: err => {
          console.error(err);
        },
      });
  }

  public addUserToMeetup(obj: AddUserToMeetup) {
    this.httpClient
      .put<any>(`${environment.baseUrl}/meetup`, obj)
      .subscribe({
        next: value => {
          console.log(value)
        },
        error: err => {
          console.error(err);
        },
      });
  }

  public deleteUserfromMeetup(obj: AddUserToMeetup) {
    this.httpClient
      .delete<any>(`${environment.baseUrl}/meetup`, {body: obj})
      .subscribe({
        next: value => {
          console.log(value)
        },
        error: err => {
          console.error(err);
        },
      });
  }


}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MeetupEntry} from "../interfaces/meetup-entry";
import {environment} from "../../environments/environment";
import {BehaviorSubject, delay, map, Observable, ReplaySubject, Subscription, tap} from "rxjs";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {AddUserToMeetup} from "../interfaces/add-user-to-meetup";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MeetupServiceService {

  private meetupsData$: BehaviorSubject<Array<IMeetupRecord>> = new BehaviorSubject<Array<IMeetupRecord>>([])
  private meetupToEdit$: BehaviorSubject<Array<IMeetupRecord>> = new BehaviorSubject<Array<IMeetupRecord>>([])
  public loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  private tokens: string[] = []

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  fetchList() {
    this.loaded$.next(false)
    this.httpClient.get<IMeetupRecord[]>(`${environment.baseUrl}/meetup`)
      .pipe((delay(500)))
      .pipe(map(value => value.filter(meetupRecord => {
    if (meetupRecord.owner === null) {
      return false
    }
    return this.tokens.every(token => (meetupRecord.name.includes(token))
      ||(meetupRecord.owner.fio.toLowerCase().includes(token))
      ||(meetupRecord.description.toLowerCase().includes(token))
      ||(formatDate(meetupRecord.time, 'dd.MM.yyyyTHH:mm', 'en').includes(token)))
      })))
      .subscribe({
        next: receivedItems => this.meetupsData$.next(receivedItems),
        complete: () => this.loaded$.next(true)
      })

  }

  get loaded():BehaviorSubject<boolean>{
    return this.loaded$
  }

  clearFilter() {
    this.tokens = []
  }

  fetchFilteredList(filterStr: string) {
    this.tokens = filterStr.toLowerCase().split(' ')
    this.fetchList()
    // this.httpClient.get<IMeetupRecord[]>(`${environment.baseUrl}/meetup`)
    //   .pipe(map(value => value.filter(meetupRecord => {
    //     let tokens = filterStr.toLowerCase().split(' ')
    //     if (meetupRecord.owner === null) {
    //       return false
    //     }
    //       return tokens.every(token => (meetupRecord.name.includes(token))
    //       ||(meetupRecord.owner.fio.toLowerCase().includes(token))
    //       ||(meetupRecord.description.toLowerCase().includes(token))
    //       ||(meetupRecord.time.toLocaleString().toLowerCase().includes(token)))
    //   }
    //   )))
    //
    //   .subscribe(receivedItems => this.meetupsData$.next(receivedItems));
  }

  get meetupList(): Observable<IMeetupRecord[]> {
    return this.meetupsData$.asObservable()
  }

  fetchMeetup(meetupId: string) {
    this.httpClient.get<IMeetupRecord[]>(`${environment.baseUrl}/meetup`)
      .pipe(map(value => value.filter(meetupRecord => meetupRecord.owner !== null)),
        map(values =>values.filter(value =>value.id ===Number(meetupId))))
      .subscribe({next: receivedItems =>{
        console.log(receivedItems)
        this.meetupToEdit$.next(receivedItems)
          this.router.navigate(['my-meetups/edit-meetup'])
      }});
  }

  get meetupToEdit () {
    return this.meetupToEdit$.asObservable()
  }



  public createMeetup(meetupEntry: MeetupEntry): void {
    this.httpClient
      .post<any>(`${environment.baseUrl}/meetup`, meetupEntry)
      .subscribe({
        next: value => {
          // console.log(value)
          // console.log(value.createdBy)
          this.router.navigate(["my-meetups"])
        },
        error: err => {
          console.error(err);
        },
      });
  }

  public editMeetup (id:number, meetupEntry: MeetupEntry){
    this.httpClient
      .put<any>(`${environment.baseUrl}/meetup/${id}`, meetupEntry)
      .subscribe({
        next: value => {
          console.log(value)
          this.fetchList()
          this.router.navigate(["my-meetups"])
        },
        error: err => {
          console.error(err);
        },
      });
  }


 public deleteMeetup (id:string) {
    this.httpClient.delete(`${environment.baseUrl}/meetup/${id}`)
      .subscribe({
        next: value => {
          console.log(value)
          this.fetchList()
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
          this.fetchList()
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
          this.fetchList()
        },
        error: err => {
          console.error(err);
        },
      });
  }


}

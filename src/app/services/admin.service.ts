import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {Role} from "../interfaces/role";
import {User} from "../interfaces/user";
import {UserIdName} from "../user-id-name";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  public usersData$: BehaviorSubject<InfoUserAdmin[]> = new BehaviorSubject<InfoUserAdmin[]>([])
  private userToEditData$: BehaviorSubject<InfoUserAdmin[]> = new BehaviorSubject<InfoUserAdmin[]>([])
  public loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  totalItemsCount = 0;
  pageSize = 10;
  currentPageIndex = 0;
  private startIndex: number = 0;
  private endIndex: number = 10;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  setPagination(pageSize:number, currentPageIndex:number) {
    this.pageSize = pageSize
    this.currentPageIndex = currentPageIndex
    this.startIndex = this.currentPageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.fetchList()
  }

  fetchList() {
    this.loaded$.next(false)
    // let obs =
    this.httpClient.get<InfoUserAdmin[]>(`${environment.baseUrl}/user`)
      .pipe(
        (delay(500)),
        (map(users => {
          this.totalItemsCount = users.length;
          return users.filter(
          (user, index) => {
            return (index>=this.startIndex)&&(index<this.endIndex)
          })}))
      )
      .subscribe({
        next: receivedItems => {
          return this.usersData$.next(receivedItems)},
        complete: () => this.loaded$.next(true)
      });
    // return obs
  }
  get usersList(): Observable<InfoUserAdmin[]> {
    return this.usersData$.asObservable()
  }

  get loaded():BehaviorSubject<boolean>{
    return this.loaded$
  }

  fetchUser(id: string) {
    this.httpClient.get<InfoUserAdmin[]>(`${environment.baseUrl}/user`)
      .pipe(map(receivedItems => receivedItems.filter(item => item.id === Number(id))))
      .subscribe({next: receivedItems =>{
        console.log(receivedItems)
        this.userToEditData$.next(receivedItems)
      this.router.navigate(['all-users/user-edit'])}})
  }

  get userToEdit () {
    return this.userToEditData$.asObservable()
  }

  editUser(id:number, entry:User) {
    this.httpClient.put(`${environment.baseUrl}/user/${id}`, entry)
      .subscribe({
        next: value => {
          console.log(value)
          // alert("user edited")
          this.fetchList()
          this.router.navigate(['all-users'])
        },
        error: err => {
          console.error(err);
        },
      });
  }



  deleteUser(id: string) {
    this.httpClient.delete(`${environment.baseUrl}/user/${id}`)
      .subscribe({
        next: value => {
          console.log(value)
          // alert("user deleted")
          this.fetchList()
        },
        error: err => {
          console.error(err);
        },
      });
  }

  addAdmin(data: UserIdName) {
    this.httpClient.put(`${environment.baseUrl}/user/role`, data)
      .subscribe({
        next: value => {
          console.log(value)
          this.fetchList()
          this.router.navigate(['all-users'])
        },
        error: err => {
          console.error(err);
        },
      });
  }


}

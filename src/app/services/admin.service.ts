import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {Role} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersData$: BehaviorSubject<InfoUserAdmin[]> = new BehaviorSubject<InfoUserAdmin[]>([])
  private rolesData$: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([])
  constructor(private httpClient: HttpClient) { }

  fetchList() {
    this.httpClient.get<InfoUserAdmin[]>(`${environment.baseUrl}/user`)
      .pipe(tap(receivedItems =>console.log(receivedItems)))
      .subscribe(receivedItems => this.usersData$.next(receivedItems));
  }
  get usersList(): Observable<InfoUserAdmin[]> {
    return this.usersData$.asObservable()
  }

  // fetchRolesList() {
  //   this.httpClient.get<Role[]>(`${environment.baseUrl}/role`)
  //     // .pipe(tap(receivedItems =>console.log(receivedItems)))
  //     .subscribe(receivedItems => this.rolesData$.next(receivedItems));
  // }
  //
  // get rolesList(): Observable<Role[]> {
  //   return this.rolesData$.asObservable()
  // }

}

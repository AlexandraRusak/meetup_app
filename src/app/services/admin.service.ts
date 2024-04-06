import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {IMeetupRecord} from "../interfaces/imeetup-record";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersData$: BehaviorSubject<InfoUserAdmin[]> = new BehaviorSubject<InfoUserAdmin[]>([])
  constructor(private httpClient: HttpClient) { }

  // public requestUsers(): Observable<Array<InfoUserAdmin>> {
  //   console.log("request users sent")
  //   return this.httpClient
  //     .get<Array<InfoUserAdmin>>(`${environment.baseUrl}/user`)
  // }

  fetchList() {
    this.httpClient.get<InfoUserAdmin[]>(`${environment.baseUrl}/user`)
      .subscribe(receivedItems => this.usersData$.next(receivedItems));
  }
  get usersList(): Observable<InfoUserAdmin[]> {
    return this.usersData$.asObservable()
  }


}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {InfoUserAdmin} from "../interfaces/info-user-admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public requestUsers(): Observable<Array<InfoUserAdmin>> {
    console.log("request users sent")
    return this.httpClient
      .get<Array<InfoUserAdmin>>(`${environment.baseUrl}/user`)

  }
}

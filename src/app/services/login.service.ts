import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import { environment} from "../../environments/environment";

export interface Token {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
    let token = this.token
    this.logMeIn(token)
  }

  public logMeIn(token:string | null):void {
    this.isLoggedIn = false
    this.userName = ''
    if (token!=null) {
      try {
        this.userName = this.parseJwt(token).email
        this.userId = this.parseJwt(token).id
        this.isLoggedIn = true
        if (this.parseJwt(token).roles[0].name === "ADMIN") {
          console.log("Admin logged in")
          this.adminLoggedIn= true
        }
        localStorage.setItem("token", token);
      } catch (e) {
        console.error('Error during parsing token')
      }
    }
  }

  isLoggedIn: boolean = false;
  adminLoggedIn: boolean = false;
  userId: number | undefined
  userName:string = "";
  // message: string = "";

  public get token(): string | null {
    return localStorage.getItem("token");
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get user(): User | null {
    const token = localStorage.getItem('token');
    if (token) {
      const user: User = this.parseJwt(token);
      console.log(user)
      return user;
    } else return null;
  }


  public logout () {
    this.isLoggedIn = false;
    this.userName = "";
    this.adminLoggedIn=false;
    localStorage.removeItem("token");
    this.router.navigate([""])
  }
  public register(user: User):void {
    console.log('register func', user)
    this.httpClient
      .post<Token>(`${environment.baseUrl}/auth/registration`, user)
      .subscribe({
        next: value => {
          this.logMeIn(value.token)
          this.router.navigate(["all-meetups"])
        },
        error: err => {
          console.log('JWT token parser exception')
          console.error(err);
          // this.message = "Something went wrong. Please try again"
        },
        complete: () => console.log('Complete and unsubscribe')
      });
  }

  public login(user: User):void {
    this.httpClient
      .post<Token>(`${environment.baseUrl}/auth/login`, user)
      .subscribe({
        next: value => {
          this.logMeIn(value.token)
          this.router.navigate(["all-meetups"])
        },
        error: err => {
          console.error(err);
          // this.message = "Something went wrong. Please try again"
        },
        // complete: () => console.log('Complete and unsubscribe')
      });
  }

}

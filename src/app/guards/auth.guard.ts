import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../services/login.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  // console.log('CanActivate called');

  let isLoggedIn = loginService.isLoggedIn;
  if (isLoggedIn){
    return true
  } else {
    router.navigate([""]);
    return false
  }
};

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // console.log('CanActivate Admin called');

  let adminLoggedIn = loginService.adminLoggedIn;
  if (adminLoggedIn){
    return true
  } else {
    router.navigate([""]);
    return false
  }
};

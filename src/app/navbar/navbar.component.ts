import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive],
  // template: `<!--<p>test navbar template</p>-->`,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public loginService: LoginService) {
  }

  // handleClick($event:any) {
  //   console.log($event.target)
  //   if (!$event.target.classList.contains("nav-link")) {
  //     console.log("not my target")
  //     return
  //   }
  //   $event.target.classList.toggle("active")
  // }

}

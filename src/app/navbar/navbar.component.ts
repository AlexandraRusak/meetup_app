import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  // template: `<!--<p>test navbar template</p>-->`,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public loginService: LoginService) {
  }

}

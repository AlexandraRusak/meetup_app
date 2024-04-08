import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../interfaces/user";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup


  constructor(public loginService: LoginService,
              private formBuilder: FormBuilder) {

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      fio: new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.invalid) {
        return;
    }
    console.log("form valid")
    let entry: User = {
      email: `${this.loginForm.value.email}`,
      password: `${this.loginForm.value.password}`,
      fio: `${this.loginForm.value.fio}`
    }
    this.loginService.login(entry)
  }
}


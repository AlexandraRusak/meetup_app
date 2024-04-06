import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../interfaces/user";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    loginForm!: FormGroup<{
      email: FormControl<string | null>;
      password: FormControl<string | null>;
      fio: FormControl<string | null>;
  }>;

  constructor (public loginService: LoginService,
               private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',  [Validators.required]],
      fio: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("form invalid")
      console.log(this.f['email'].errors)
      console.log(this.f['password'].errors)
      console.log(this.f['fio'].errors)
      /** Обрабатываем ошибку и прерываем выполнение метода*/
      return;
    }
    console.log("form valid")
    let entry: User = {
      email: `${this.loginForm.value.email}`,
      password: `${this.loginForm.value.password}`,
      fio: `${this.loginForm.value.fio}`
    }

    console.log(entry)

    this.loginService.login(entry)
  }
}


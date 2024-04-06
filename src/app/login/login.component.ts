import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../interfaces/user";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";


// export interface LoginForm {
//   email: FormControl<string>;
//   password: FormControl<string>;
//   fio: FormControl<string>;
// }
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    loginForm!: FormGroup<{
      email: FormControl<string | {nonNullable: boolean;} | null>;
      password: FormControl<string | {nonNullable: boolean;} | null>;
      fio: FormControl<string | {nonNullable: boolean;} | null>;
  }>;

  constructor (public loginService: LoginService,
               private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', {nonNullable: true}, [Validators.required]],
      password: ['', {nonNullable: true}, [Validators.required]],
      fio: ['',{nonNullable: true}, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      /** Обрабатываем ошибку и прерываем выполнение метода*/
      return;
    }

    let entry: User = {
      email: `${this.loginForm.value.email}`,
      password: `${this.loginForm.value.password}`,
      fio: `${this.loginForm.value.fio}`
    }

    console.log(entry)

    this.loginService.login(entry)
  }
}


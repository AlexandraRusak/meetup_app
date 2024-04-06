import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LoginService} from "../services/login.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup<{
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
    return this.registerForm.controls;
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fio: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log("form invalid")
      console.log(this.f['email'].errors)
      console.log(this.f['password'].errors)
      console.log(this.f['fio'].errors)
      /** Обрабатываем ошибку и прерываем выполнение метода*/
      return;
    }

    console.log("form valid")
    let entry: User = {
      email: `${this.registerForm.value.email}`,
      password: `${this.registerForm.value.password}`,
      fio: `${this.registerForm.value.fio}`
    }

    console.log(entry)

    this.loginService.register(entry)
  }


}

import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {map, Subject, takeUntil} from "rxjs";
import {AdminService} from "../services/admin.service";
import {InfoUserAdmin} from "../interfaces/info-user-admin";
import {IMeetupRecord} from "../interfaces/imeetup-record";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../interfaces/user";
import {Role} from "../interfaces/role";
import {NgIf} from "@angular/common";
import {UserIdName} from "../user-id-name";

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnDestroy {

  editForm: FormGroup
  private destroy: Subject<void> = new Subject();
  adminService = inject(AdminService);
  dataToEdit!: InfoUserAdmin

  public hasAdmin: boolean = false
  public hasUser: boolean = false

  constructor () {
    console.log(this.userToEdit)
    this.checkRoles()
    console.log(this.hasAdmin)
    console.log(this.hasUser)
    this.editForm = new FormGroup({
      email: new FormControl(`${this.userToEdit.email}`, [Validators.required, Validators.email]),
      password: new FormControl(`${this.userToEdit.password}`, [Validators.required]),
      fio: new FormControl(`${this.userToEdit.fio}`, [Validators.required])
    })


  }

  get userToEdit(): InfoUserAdmin {
    this.adminService.userToEdit
      .pipe(takeUntil(this.destroy))
      .subscribe(values =>{
      this.dataToEdit = values[0]
    })
    return this.dataToEdit
  }

  checkRoles() {

    if (this.userToEdit.roles.find(role =>role.name ==="USER"))
    { this.hasUser = true }
    if (this.userToEdit.roles.find(role => role.name==="ADMIN"))
    { this.hasAdmin = true }
  }


  onSubmit() {
    this.editForm.markAllAsTouched()
    if (this.editForm.invalid) {
      return;
    }
    console.log("form valid")
    let entry: User = {
      email: `${this.editForm.value.email}`,
      password: `${this.editForm.value.password}`,
      fio: `${this.editForm.value.fio}`
    }
    this.adminService.editUser(this.userToEdit.id, entry)
  }

  handleAddAdmin () {
    const data: UserIdName = {
      name: "ADMIN",
      userId: this.userToEdit.id,
    }
    this.adminService.addAdmin(data)
  }

ngOnDestroy() {
  this.destroy.next();
  this.destroy.complete();
}

}

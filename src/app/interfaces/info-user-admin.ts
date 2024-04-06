import {Role} from "./role";

export interface InfoUserAdmin {
  createdAt: string;
  email: string;
  fio: string;
  id: number
  password: string;
  roles: Role[];
  updatedAt: string;
}

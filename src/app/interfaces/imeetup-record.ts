import {IUser} from "./iuser";

export interface IMeetupRecord {
  createdAt: string;
  createdBy: number;
  description: string;
  duration: number;
  id: number;
  location:string;
  name: string;
  need_to_know: string;
  owner: IUser;
  reason_to_come: string;
  target_audience: string;
  time:Date;
  updatedAt:string;
  users: Array<IUser>;
  will_happen:string;
}

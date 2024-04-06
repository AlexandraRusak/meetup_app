import {Validators} from "@angular/forms";

export interface MeetupEntry {
  name: string;
  description: string;
  time: string;
  duration: number;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
}

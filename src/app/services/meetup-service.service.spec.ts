import { TestBed } from '@angular/core/testing';

import { MeetupServiceService } from './meetup-service.service';

describe('MeetupServiceService', () => {
  let service: MeetupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

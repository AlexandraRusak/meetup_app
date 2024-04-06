import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupRecordComponent } from './meetup-record.component';

describe('MeetupRecordComponent', () => {
  let component: MeetupRecordComponent;
  let fixture: ComponentFixture<MeetupRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetupRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetupRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

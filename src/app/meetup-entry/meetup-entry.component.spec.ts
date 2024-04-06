import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupEntryComponent } from './meetup-entry.component';

describe('MeetupEntryComponent', () => {
  let component: MeetupEntryComponent;
  let fixture: ComponentFixture<MeetupEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetupEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetupEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

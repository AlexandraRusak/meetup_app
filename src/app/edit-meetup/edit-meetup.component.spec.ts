import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetupComponent } from './edit-meetup.component';

describe('EditMeetupComponent', () => {
  let component: EditMeetupComponent;
  let fixture: ComponentFixture<EditMeetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMeetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

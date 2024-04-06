import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMeetupsComponent } from './all-meetups.component';

describe('AllMeetupsComponent', () => {
  let component: AllMeetupsComponent;
  let fixture: ComponentFixture<AllMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMeetupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

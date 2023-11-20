import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCalenderComponent } from './weekly-calender.component';

describe('WeeklyCalenderComponent', () => {
  let component: WeeklyCalenderComponent;
  let fixture: ComponentFixture<WeeklyCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyCalenderComponent]
    });
    fixture = TestBed.createComponent(WeeklyCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

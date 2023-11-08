import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentLevelComponent } from './view-student-level.component';

describe('ViewStudentLevelComponent', () => {
  let component: ViewStudentLevelComponent;
  let fixture: ComponentFixture<ViewStudentLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudentLevelComponent]
    });
    fixture = TestBed.createComponent(ViewStudentLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigisterComponent } from './register.component';

describe('RigisterComponent', () => {
  let component: RigisterComponent;
  let fixture: ComponentFixture<RigisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RigisterComponent],
    });
    fixture = TestBed.createComponent(RigisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

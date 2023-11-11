import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccountingComponent } from './home-accounting.component';

describe('HomeAccountingComponent', () => {
  let component: HomeAccountingComponent;
  let fixture: ComponentFixture<HomeAccountingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAccountingComponent]
    });
    fixture = TestBed.createComponent(HomeAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

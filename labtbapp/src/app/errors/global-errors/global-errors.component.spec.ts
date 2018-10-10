import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalErrorsComponent } from './global-errors.component';

describe('GlobalErrorsComponent', () => {
  let component: GlobalErrorsComponent;
  let fixture: ComponentFixture<GlobalErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

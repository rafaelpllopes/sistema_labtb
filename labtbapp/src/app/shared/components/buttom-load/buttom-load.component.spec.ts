import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomLoadComponent } from './buttom-load.component';

describe('ButtomLoadComponent', () => {
  let component: ButtomLoadComponent;
  let fixture: ComponentFixture<ButtomLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

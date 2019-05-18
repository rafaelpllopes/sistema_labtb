import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosPeriodoComponent } from './laudos-periodo.component';

describe('LaudosPeriodoComponent', () => {
  let component: LaudosPeriodoComponent;
  let fixture: ComponentFixture<LaudosPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

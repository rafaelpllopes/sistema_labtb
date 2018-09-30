import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosImprimirComponent } from './laudos-imprimir.component';

describe('LaudosImprimirComponent', () => {
  let component: LaudosImprimirComponent;
  let fixture: ComponentFixture<LaudosImprimirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosImprimirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

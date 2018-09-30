import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosResultadoComponent } from './laudos-resultado.component';

describe('LaudosResultadoComponent', () => {
  let component: LaudosResultadoComponent;
  let fixture: ComponentFixture<LaudosResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

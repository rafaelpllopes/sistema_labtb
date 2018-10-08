import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAdicionarComponent } from './paciente-adicionar.component';

describe('PacienteAdicionarComponent', () => {
  let component: PacienteAdicionarComponent;
  let fixture: ComponentFixture<PacienteAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

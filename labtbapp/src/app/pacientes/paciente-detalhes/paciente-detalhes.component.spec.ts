import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDetalhesComponent } from './paciente-detalhes.component';

describe('PacienteDetalhesComponent', () => {
  let component: PacienteDetalhesComponent;
  let fixture: ComponentFixture<PacienteDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

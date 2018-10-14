import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetalhesComponent } from './usuario-detalhes.component';

describe('UsuarioDetalhesComponent', () => {
  let component: UsuarioDetalhesComponent;
  let fixture: ComponentFixture<UsuarioDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

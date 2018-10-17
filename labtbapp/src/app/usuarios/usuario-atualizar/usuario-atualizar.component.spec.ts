import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAtualizarComponent } from './usuario-atualizar.component';

describe('UsuarioAtualizarComponent', () => {
  let component: UsuarioAtualizarComponent;
  let fixture: ComponentFixture<UsuarioAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

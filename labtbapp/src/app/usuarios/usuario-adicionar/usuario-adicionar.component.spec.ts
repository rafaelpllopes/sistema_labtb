import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAdicionarComponent } from './usuario-adicionar.component';

describe('UsuarioAdicionarComponent', () => {
  let component: UsuarioAdicionarComponent;
  let fixture: ComponentFixture<UsuarioAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosProducaoComponent } from './relatorios-producao.component';

describe('RelatoriosProducaoComponent', () => {
  let component: RelatoriosProducaoComponent;
  let fixture: ComponentFixture<RelatoriosProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriosProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

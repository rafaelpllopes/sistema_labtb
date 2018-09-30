import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosDetalhesComponent } from './laudos-detalhes.component';

describe('LaudosDetalhesComponent', () => {
  let component: LaudosDetalhesComponent;
  let fixture: ComponentFixture<LaudosDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

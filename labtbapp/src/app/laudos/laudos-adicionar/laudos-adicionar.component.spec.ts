import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosAdicionarComponent } from './laudos-adicionar.component';

describe('LaudosAdicionarComponent', () => {
  let component: LaudosAdicionarComponent;
  let fixture: ComponentFixture<LaudosAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

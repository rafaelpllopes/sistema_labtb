import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosLaudosComponent } from './relatorios-laudos.component';

describe('RelatoriosLaudosComponent', () => {
  let component: RelatoriosLaudosComponent;
  let fixture: ComponentFixture<RelatoriosLaudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriosLaudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosLaudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

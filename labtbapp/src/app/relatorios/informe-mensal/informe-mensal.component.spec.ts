import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeMensalComponent } from './informe-mensal.component';

describe('InformeMensalComponent', () => {
  let component: InformeMensalComponent;
  let fixture: ComponentFixture<InformeMensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeMensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

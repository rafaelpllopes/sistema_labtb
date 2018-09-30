import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosSearchComponent } from './laudos-search.component';

describe('LaudosSearchComponent', () => {
  let component: LaudosSearchComponent;
  let fixture: ComponentFixture<LaudosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

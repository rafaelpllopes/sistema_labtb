import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosListComponent } from './laudos-list.component';

describe('LaudosListComponent', () => {
  let component: LaudosListComponent;
  let fixture: ComponentFixture<LaudosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionCalenderDetailComponent } from './execution-calender-detail.component';

describe('ExecutionCalenderDetailComponent', () => {
  let component: ExecutionCalenderDetailComponent;
  let fixture: ComponentFixture<ExecutionCalenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionCalenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionCalenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

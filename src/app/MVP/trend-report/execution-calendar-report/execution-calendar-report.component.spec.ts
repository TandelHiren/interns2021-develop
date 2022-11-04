import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionCalendarReportComponent } from './execution-calendar-report.component';

describe('ExecutionCalendarReportComponent', () => {
  let component: ExecutionCalendarReportComponent;
  let fixture: ComponentFixture<ExecutionCalendarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionCalendarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionCalendarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

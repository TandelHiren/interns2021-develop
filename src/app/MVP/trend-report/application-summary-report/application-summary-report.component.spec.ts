import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSummaryReportComponent } from './application-summary-report.component';

describe('ApplicationSummaryReportComponent', () => {
  let component: ApplicationSummaryReportComponent;
  let fixture: ComponentFixture<ApplicationSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSummaryReportComponent } from './module-summary-report.component';

describe('ModuleSummaryReportComponent', () => {
  let component: ModuleSummaryReportComponent;
  let fixture: ComponentFixture<ModuleSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

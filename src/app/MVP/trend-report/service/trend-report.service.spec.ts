import { TestBed } from '@angular/core/testing';

import { TrendReportService } from './trend-report.service';

describe('TrendReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrendReportService = TestBed.get(TrendReportService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TrendReportFilterService } from './trend-report-filter.service';

describe('TrendReportFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrendReportFilterService = TestBed.get(TrendReportFilterService);
    expect(service).toBeTruthy();
  });
});

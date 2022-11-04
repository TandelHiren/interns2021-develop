/**
 * @author Hiren Tandel
 * @description the Trend Report Module.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedModule } from '../shared';
import {
  ApplicationSummaryDetailsAdapter } from './application-summary-report/application-summary-report-adapter/application-summary.adapter';
import { ApplicationSummaryReportComponent } from './application-summary-report/application-summary-report.component';
import { ExecutionDurationTrendComponent } from './duration-execution-trend/execution-duration-trend.component';
import { ExceptionTrendComponent } from './exception-execution-trend/exception-trend.component';
/** -------------------------------------------------------------- */
import { ExecutionCalendarReportComponent } from './execution-calendar-report/execution-calendar-report.component';
import {
   ExecutionCalenderDetailComponent } from './execution-calendar-report/execution-calender-detail/execution-calender-detail.component';
import { ExecutionTrendComponent } from './module-execution-trend/execution-trend.component';
import { ModuleExecutionDetailsAdapter } from './module-execution-trend/module-execution-adapter/module-execution.adapter';
import { ModuleSummaryReportComponent } from './module-summary-report/module-summary-report.component';
import { TrendReportService } from './service/trend-report.service';
import { TrendReportComponent } from './trend-report.component';
import { routes } from './trend-report.routing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// RECOMMENDED

import { TrendReportFilterService } from './service/trend-report-filter.service';

@NgModule({
  declarations: [
    ExceptionTrendComponent,
    ExecutionTrendComponent,
    ExecutionDurationTrendComponent,
    ApplicationSummaryReportComponent,
    ModuleSummaryReportComponent,
    ExecutionCalendarReportComponent,
    TrendReportComponent,
    ExecutionCalenderDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    GoogleChartsModule ,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  
  ],
  providers: [
    TrendReportService,
    TrendReportFilterService,
    ModuleExecutionDetailsAdapter,
    ApplicationSummaryDetailsAdapter,
  ],
})
export class TrendReportModule { }

/**
 * @author Hiren Tandel
 * @description separate routing for trend report Module.
 */
import { Routes } from '@angular/router';
/** -------------------------------------------------------------- */
import { ApplicationSummaryReportComponent } from './application-summary-report/application-summary-report.component';
import { ExecutionDurationTrendComponent } from './duration-execution-trend/execution-duration-trend.component';
import { ExceptionTrendComponent } from './exception-execution-trend/exception-trend.component';
import { ExecutionCalendarReportComponent } from './execution-calendar-report/execution-calendar-report.component';
import { ExecutionTrendComponent } from './module-execution-trend/execution-trend.component';
import { ModuleSummaryReportComponent } from './module-summary-report/module-summary-report.component';
/** -------------------------------------------------------------- */

export const routes: Routes = [
    {   
        path: '',
        redirectTo: 'trend-report/applicationId/exception-execution-trend',
        pathMatch:'full'
    },
    {
        path: ':applicationId/exception-execution-trend',
        component: ExceptionTrendComponent,
        data: {
            breadcrumbs: 'Exception Execution Trend'
        }
    },
    {
        path: ':applicationId/duration-execution-trend',
        component: ExecutionDurationTrendComponent,
        data: {
            breadcrumbs: 'Duration Execution Trend'
        }
    },
    {
        path: ':applicationId/module-execution-trend',
        component: ExecutionTrendComponent,
        data: {
            breadcrumbs: 'Module Execution Trend'
        }
    },
    {
        path: ':applicationId/last-execution-summary',
        component: ApplicationSummaryReportComponent,
        data: {
            breadcrumbs: 'Last Execution Summary'
        }
    },
    {
        path: ':applicationId/module-summary-report',
        component: ModuleSummaryReportComponent,
        data: {
            breadcrumbs: 'Module Summary Report'
        }
    },
    {
        path: ':applicationId/execution-calendar-report',
        component: ExecutionCalendarReportComponent,
        data: {
            breadcrumbs: 'Execution Calendar Report'
        }
    }
];

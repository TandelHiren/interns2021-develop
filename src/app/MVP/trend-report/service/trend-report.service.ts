
import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
/** ---------------------------------------------------------- */
import { HttpCommonService } from '../../core';
import { ProjectCard } from '../../dashboard/dashboard.model';
import {
  ApplicationSummaryDetailsAdapter,
} from '../application-summary-report/application-summary-report-adapter/application-summary.adapter';
import {
  ApplicationSummaryDetails,
  ApplicationSummaryDetailsReponse,
  ApplicationSummaryReport,
} from '../application-summary-report/application-summary-report.model';
import { ExecutionDurationTrend } from '../duration-execution-trend/execution-duration-trend.model';
import { ExceptionExecutionDetail, ExceptionTrend, ExceptionTrendDetail } from '../exception-execution-trend/exception-trend.model';
import { ExecutionCalender } from '../execution-calendar-report/execution-calendar-report.model';
import {
  ExecutionTrend, ModuleExecutionDetailsReport, ModuleExecutionDetailsReportList,
  ModuleExecutionDetailsReportReponse,
} from '../module-execution-trend/execution-trend.model';
import { ModuleExecutionDetailsAdapter } from '../module-execution-trend/module-execution-adapter/module-execution.adapter';
import { ModuleSummaryReport } from '../module-summary-report/module-summary-report.model';
/**
 * Trend report service
 */
@Injectable({
  providedIn: 'root',
})
export class TrendReportService {

  /**
   * provides the base URL for Http Request
   */
  private baseUrl: string;

  constructor
    (
      private _httpCommonService: HttpCommonService,
      @Inject('environmentConfig') private config: any,
      private moduleExecutionTrendAdapter: ModuleExecutionDetailsAdapter,
      private applicationSummaryAdapter: ApplicationSummaryDetailsAdapter,
  ) {
    this.initProps();
  }
  /**
   *  Duration-Trend REST API.
   * @author Hiren Tandel
   * @description gets Duration-Trend the data by REST API.
   * @param applicationId     the applicationId
   */
  public getDurationExecutionTrend(applicationId: number, noOfExecutions?: number): Observable<ExecutionDurationTrend> {
    return this._httpCommonService.httpGetRequest<ExecutionDurationTrend>
      (this.baseUrl + '/module-duration-trend?applicationId=' + applicationId);

  }

  /**
   * Exception-Trend REST API
   * @author Hiren Tandel
   * @description get Exception-Trend the data by REST API.
   * @param applicationId  the application Id
   */
  public getExceptionExecutionTrend(applicationId: number, noOfExecutions?: number): Observable<ExceptionTrend> {
    return this._httpCommonService.httpGetRequest<ExceptionTrend>(this.baseUrl + '/module-exception-trend?applicationId=' + applicationId);
  }

  /**
   * Exception-Trend details REST API
   * @author Hiren Tandel
   * @description get Exception-Trend details the data by REST API.
   * @param executionId  The executionId
   */
  public getExceptionExecutionDetail(executionId: number, exceptionName: string): Observable<ExceptionTrendDetail> {
    return this._httpCommonService.httpGetRequest<ExceptionTrendDetail>
      (this.baseUrl + '/module-exception-trend/detail?executionId=' + executionId + '&exceptionName=' + exceptionName);
  }
  /**
   * Execution-Trend rest api
   * @author Hiren Tandel
   * @description get Execution-Trend the data by REST API.
   * @param moduleId the moduleId
   */
  public getModuleExecutionTrend(applicationId: number, noOfExecutions?: number): Observable<ExecutionTrend> {
    return this._httpCommonService.
      httpGetRequest<ExecutionTrend>(this.baseUrl + '/module-execution-trend?applicationId=' + applicationId);
  }
  /**
   * Module Execution Details rest api
   * @author Hiren Tandel
   * @description get Module Execution Details Report the data by REST API.
   * @param executionId the executionId
   */
  public getModuleExecutionDetailsReport(executionId: number, status: string): Observable<ModuleExecutionDetailsReport[]> {
    return this._httpCommonService
      .httpGetRequest<ModuleExecutionDetailsReport[]>
      (this.baseUrl + '/application-summary-report/detail?executionId=' + executionId + '&status=' + status)
      .pipe(map((data: ModuleExecutionDetailsReportReponse[]) =>
        data.map((item: ModuleExecutionDetailsReportReponse) => this.moduleExecutionTrendAdapter.toResponse(item)))
      );

  }
  /**
   *  Application summary rest api
   * @author Hiren Tandel
   * @description  get application summary report data by REST API.
   * @param applicationId The applicationId
   */
  public getApplicationSummaryReport(applicationId: number): Observable<ApplicationSummaryReport[]> {
    return this._httpCommonService
      .httpGetRequest<ApplicationSummaryReport>(this.baseUrl + '/application-summary-report?applicationId=' + applicationId);
  }
  /**
   *  Application summary details report rezt api
   * @author Hiren Tandel
   * @description  get application summary report data by REST API.
   * @param executionId The executionId
   */
  public getApplicationSummuryDetails(executionId: number, status: string): Observable<ApplicationSummaryDetails[]> {
    ;

    return this._httpCommonService
      .httpGetRequest<ApplicationSummaryDetails[]>
      (this.baseUrl + '/application-summary-report/detail?executionId=' + executionId + '&status=' + status)
      .pipe(map((data: ApplicationSummaryDetailsReponse[]) => {
        let value: ApplicationSummaryDetails[] = [];
        value = data.map((items: ApplicationSummaryDetailsReponse) => this.applicationSummaryAdapter.toResponse(items));
        return value;
      }));
  }
  /**
   * Module summary report rest api
   * @author Hiren Tandel
   * @description  get module summary report data by REST API.
   * @param moduleId The moduleId
   */
  public getModuleSummaryReport(moduleId: number): Observable<ModuleSummaryReport> {
    return this._httpCommonService.httpGetRequest<ModuleSummaryReport>(this.baseUrl + '/module-summary-report?moduleId=' + moduleId);
  }
  /**
   * Execution calendar rest api
   * @author Hiren Tandel
   * @description  get execution calendar the data by REST API.
   * @param applicationId The applicationId
   */
  public getExecutionCalendar(applicationId: number, fromdate: string, todate: string): Observable<ExecutionCalender> {
    const url: string = this.baseUrl + '/execution-calendar-report?applicationId=' +
      applicationId + '&fromDate=' + fromdate + '&toDate=' + todate;
    return this._httpCommonService
      .httpGetRequest<ExecutionCalender>(url);
  }
  /**
   * Execution calendar detail rest api
   * @author Hiren Tandel
   * @description  get execution calendar the data by REST API.
   * @param applicationId The applicationId
   */
  public getExecutionCalendarDetails(applicationId: number, createdDate: string): Observable<ExecutionCalender> {
    const url: string = this.baseUrl + '/execution-calendar-report/detail?applicationId=' +
      applicationId + '&createdDate=' + createdDate;
    return this._httpCommonService.httpGetRequest<ExecutionCalender>(url);
  }

  /**
   * Single Application details rest api
   * @author Hiren Tandel
   * @description gets the single Application details by REST API.
   * @param applicationId         the Application Id
   */
  public getApplicationById(applicationId: number): Observable<any> {
    return this._httpCommonService.httpGetRequest<any>(this.baseUrl + '/application/' + applicationId);
  }
  /**
   * Initializes the properties
   * @author Hiren Tandel
   * @description initializes the properties
   */
  private initProps(): void {
  this.baseUrl = this.config.baseUrl;
}

}

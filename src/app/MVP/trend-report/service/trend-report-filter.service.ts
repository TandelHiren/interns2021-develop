import { Injectable, Inject } from '@angular/core';
import { HttpCommonService } from 'src/app/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrendReportFilterService {
    /**
     * provides the base URL for Http Request
     */
  private baseUrl: string;

  constructor
    (
      private _httpCommonService: HttpCommonService,
      @Inject('environmentConfig') private config: any
    ) {
    this.initProps();
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
   * Single Application details rest api
   * @author Hiren Tandel
   * @description gets the single Application details by REST API.
   * @param applicationId         the Application Id
   */
  public getModuleById(applicationId: number): Observable<any> {
    return this._httpCommonService.httpGetRequest<any>(this.baseUrl + '/module/' + applicationId);
  }
  /**
   * Application summary filter rest api
   * @author Hiren Tandel
   * @description  Filter view results by Date & Module 
   * @param applicationId The applicationId // filterData?: { [key: string]: string | number[] }
   */
  public getApplicationSummaryData(applicationData): Observable<any> {
    const url: string = this.baseUrl + '/application-summary-report';
    return this._httpCommonService.httpPostRequest<any>(url,applicationData);
  }

  /**
   * Execution duration date wise filter rest api
   * @author Hiren Tandel
   * @description  Filter view results by Date & Module 
   * @param applicationId The applicationId
   */
  public getDurationFilterdata(applicationData): Observable<any> {
    const url: string = this.baseUrl + '/module-duration-trend';
    return this._httpCommonService.httpPostRequest<any>(url, applicationData);
  }

  /**
   * Module execution date wise filter rest api
   * @author Hiren Tandel
   * @description   Filter view results by Date & Module 
   * @param applicationId The applicationId
   */
  public getExecutionFilterdata(applicationData): Observable<any> {
    const url: string = this.baseUrl + '/module-execution-trend';
    return this._httpCommonService.httpPostRequest<any>(url, applicationData);
  }

  /**
   * Module exception date wise filter rest api
   * @author Hiren Tandel
   * @description   Filter view results by Date & Module 
   * @param applicationId The applicationId // filterData: { [key: string]: string | number[] | number }
   */
  public getExceptionFilterdata(applicationData): Observable<any> {
    const url: string = this.baseUrl + '/module-exception-trend';
    return this._httpCommonService.httpPostRequest<any>(url, applicationData);
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


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
/** ----------------------------------------------------------------------------- */
import { ApplicationSummaryDetails, ApplicationSummaryDetailsReponse, StepDetail } from '../application-summary-report.model';

/**
 * @author Hiren Tandel
 * Application summary details adapter
 */
export class ApplicationSummaryDetailsAdapter {
  /**
   * To response
   * @param item application summary details response
   * @returns response 
   */
  public toResponse(item: ApplicationSummaryDetailsReponse): ApplicationSummaryDetails {
    const applicationSummaryDetailsReport: ApplicationSummaryDetails = new ApplicationSummaryDetails();
    applicationSummaryDetailsReport.executionId = item.executionId;
    applicationSummaryDetailsReport.scenarioName = item.scenarioName;
    let status: string = '';
    applicationSummaryDetailsReport.stepdetail = item.stepdetail.map((name: any) => {
        status = status !== '' ? status + '\n' + name.status :  name.status;

        return name.stepName;
    });
    applicationSummaryDetailsReport.status = status;
    return applicationSummaryDetailsReport;
  }
}

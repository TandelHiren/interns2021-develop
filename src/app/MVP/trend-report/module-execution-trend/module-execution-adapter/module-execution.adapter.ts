
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
/** ----------------------------------------------------------------------------- */
import { ModuleExecutionDetailsReport, ModuleExecutionDetailsReportReponse, ScenarioSteps } from '../execution-trend.model';
/**
 * ModuleExecutionDetailsAdapter
 */
export class ModuleExecutionDetailsAdapter {
    /**
     * response change
     * @param item
     */
    public toResponse (item: ModuleExecutionDetailsReportReponse): ModuleExecutionDetailsReport {
        const moduleExecutionDetailsReport: ModuleExecutionDetailsReport = new ModuleExecutionDetailsReport();
        moduleExecutionDetailsReport.executionId = item.executionId;
        moduleExecutionDetailsReport.scenarioName = item.scenarioName;
        let status: string = '';
        moduleExecutionDetailsReport.scenarioSteps = item.stepdetail.map((name: ScenarioSteps) => {
            status = status !== '' ? status + '\n' + name.status :  name.status;
            return name.stepName;
        });
        moduleExecutionDetailsReport.status = status;

        return moduleExecutionDetailsReport;
    }
}

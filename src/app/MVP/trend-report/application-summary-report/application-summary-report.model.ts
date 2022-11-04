/**
 * `
 * @author Hiren Tandel
 * @description provide the application summary report
 */
export class ApplicationSummaryReport {
    /** the module execution details report execution id */
    public executionId: number;
    /** The Module Name */
    public moduleName: string;
    /** Module Execution Pass status */
    public passed: number;
    /** Module Execution fail status */
    public failed: number;
    /** Module Execution skip status */
    public skipped: number;
}
/**
 * `
 * @author Hiren Tandel
 * @description provide the application summary details
 */
export class ApplicationSummaryDetails {
    /** the module execution details report execution id */
    public executionId: number;
    /** the module execution details report Module Name */
    public moduleName: string;
    /** the module execution details report scenarioname */
    public scenarioName: string;
    /** the module execution details report scenarioname status */
    public status: string;
    /** the module execution details report scenarioSteps detail */
    public stepdetail: StepDetail[];
    /** the module execution details report scenarioSteps step name */
    public stepName: string;
}
/**
 * `
 * @author Hiren Tandel
 * @description provide the module execution details report list
 */
export class ApplicationSummaryDetailsList {
    /** the module execution details report */
    public ApplicationSummaryDetails: ApplicationSummaryDetails[];
}
/**
 * `
 * @author Hiren Tandel
 * @description provide the module execution details report reponse
 */
export class ApplicationSummaryDetailsReponse {
    /** the module execution details report execution id */
    public executionId: number;
    /** the module execution details report Module Name */
    public moduleName: string;
    /** the module execution details report  scenario name */
    public scenarioName: string;
    /** the module execution details report status */
    public status: string;
    /** the module execution details report scenario steps */
    public stepdetail: string[];
}
/**
 * `
 * @author Hiren Tandel
 * @description provide ScenarioSteps for apllication summary details
 */
export class StepDetail {
    /** The scenario step name */
    public stepName: string;
    /** The Scenario status */
    public status: string;
}
/**
 * `
 * @author Hiren Tandel
 * @description provide the ApplicationSummaryStatus
 */
export enum ApplicationSummaryStatus {
    /** the application summary executionId */
    ExecutionId = 'executionId',
    /** the application module name */
    ModuleName = 'moduleName',
    /** Execution Pass status */
    Passed = 'passed',
    /** Execution fail status */
    Failed = 'failed',
    /** Execution skip status */
    Skipped = 'skipped'
}
/**
 * `
 * @author Hiren Tandel
 * @description provide the ApplicationSummaryStatus
 */
export enum ApplicationSummary {
    /** the application summary executionId */
    ExecutionId = 'executionId',
    /** the application module name */
    ModuleName = 'moduleName',
    /** Execution Pass status */
    Passed = 'Pass',
    /** Execution fail status */
    Failed = 'Fail',
    /** Execution skip status */
    Skipped = 'Skip'
}

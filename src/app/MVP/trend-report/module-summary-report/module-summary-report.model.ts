/**
 * @author Hiren Tandel
 * @description provide the module summary report
 */
export class ModuleSummaryReport {
    /** the module summary report no of passed steps */
    public noOfPassedSteps: number;
    /** the module summary report no of failed steps */
    public noOfFailedSteps: number;
    /** the module summary report no of skiped steps */
    public noOfSkipedSteps: number;
    /** the module summary report scenario name */
    public scenarioName: string;
    /** the module summary report passed step list */
    public passedStepsList: string[];
    /** the module summary report failed step list */
    public failedStepsList: string[];
    /** the module summary report skiped step list */
    public skipedStepsList: string[];
}
/**
 * @author Hiren Tandel
 * @description provide the module summary report
 */
export class ModuleSummaryReportDetails {
    /** the module summary report no of passed steps */
    public noOfPassedSteps: number;
    /** the module summary report no of failed steps */
    public noOfFailedSteps: number;
    /** the module summary report no of skiped steps */
    public noOfSkipedSteps: number;
    /** the module summary report scenario name */
    public scenarioName: string;
    /** the module summary report passed step list */
    public passedStepsList: string[];
    /** the module summary report failed step list */
    public failedStepsList: string[];
    /** the module summary report skiped step list */
    public skipedStepsList: string[];
}
/**
 * @author Hiren Tandel
 * @description enum
 */
export enum ModuleSummaryReportcolumnData{
    /** ScenarioName */
    ScenarioName= 'scenarioName',
    /** NoOfPassedSteps */
    Noofpassedsteps= 'noOfPassedSteps',
    /** noOfFailedSteps */
    Nooffailedsteps= 'noOfFailedSteps',
    /** noOfSkipedSteps */
    Noofskipedsteps= 'noOfSkipedSteps',
}


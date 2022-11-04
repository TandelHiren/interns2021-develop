/**
 * @author Hiren Tandel
 * @description provide the module execution trend
 */
export class ExecutionTrend {
    /** The executiontrend execution id */
    public executionId: number;
    /** The executiontrend pass count */
    public passed: number;
    /** The executiontrend failed count */
    public failed: number;
    /** The executiontrend skipped count */
    public skipped: number;
    /** The executiontrend moduleName count */
    public moduleName: string;
    /** The Executiontrend scenario resource */
    public scenarioResource: ScenarioResource[];

}

/**
 * @author Hiren Tandel
 * @description provide the module execution scenarioresource
 */
export class ScenarioResource {
    /** The execution scenario name */
    public scenarioName: string;
    /** The execution status */
    public status: string;
    /** The execution status */
    public stepdetail: ScenarioSteps[];

}
// ---------------------sp3----------------------------//
/**
 * @author Hiren Tandel
 * @description provide the module execution details report
 */
export class ModuleExecutionDetailsReport {
    /** The module execution id */
    public executionId: number;
    /**  The module execution scenario name */
    public scenarioName: string;
    /** The module execution status */
    public status: string;
    /** The module execution scenario steps */
    public scenarioSteps: string[];
}
/**
 * @author Hiren Tandel
 * @description provide the module execution details report list
 */
export class ModuleExecutionDetailsReportList {
    /** the module execution details report */
    public moduleExecutionDetailsReport: ModuleExecutionDetailsReport[];
}
/**
 * @author Hiren Tandel
 * @description provide the module execution details report reponse
 */
export class ModuleExecutionDetailsReportReponse {
    /** the module execution details report execution id */
    public executionId: number;
    /** the module execution details report  scenario name */
    public scenarioName: string;
    /** the module execution details report status */
    public status: string;
    /** the module execution details report scenario steps */
    public stepdetail: ScenarioSteps[];
}
/**
 * @author Hiren Tandel
 * @description provide the module execution details report scenario steps
 */
export class ScenarioSteps {
    /** the module execution details report scenario steps name */
    public stepName: string;
    /** the module execution details report status */
    public status: string;
}
/**
 * @author Hiren Tandel
 * @description provide the module execution trend enum
 */
export enum ModuleExecutionTrend {
    /** the module execution trend execution id */
    ExecutionId = 'executionId',
    /** the module execution trend pass status */
    Passed = 'Pass',
    /** the module execution trend fail status */
    Failed = 'Fail',
    /** the module execution trend skip status */
    Skipped = 'Skip',
    //  /** the module execution trend pass status */
    //  Pass ='pass',
    //  /** the module execution trend fail status */
    //  Fail = 'fail',
    //  /** the module execution trend skip status */
    //  Skipp = 'skipp',
}

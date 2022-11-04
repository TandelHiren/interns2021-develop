/**
 * @author Hiren Tandel
 * @description provide the ExceptionTrend
 */
export class ExceptionTrend {
    /** The exception execution id */
    public executionId: number;
    /** exception scenario name */
    public moduleName: string;
    /** the exception resources */
    public exceptionName: string;
    /** the exception resources */
    public exceptionResources: ExceptionResources[];


}
/**
 * @author Hiren Tandel
 * @description provide the exception trend detail
 */
export class ExceptionTrendDetail {
    /** the exceptionexecution id */
    public executionId: number;
    /** exception scenario name */
    public scenarioName: string;
    /** Exception scenario steps */
    public scenarioSteps: string;
    /** the exception resources */
    public status: string;
    /** the exception resources */
    public exceptionName: string;

}

/**
 * @author Hiren Tandel
 * @description provide exception Resources
 */
export class ExceptionResources {
    /** exeception name */
    public exceptionName: string;
    /** execption count */
    public exceptionCount: number;
}
/**
 * @author Hiren Tandel
 * @description provide the exception execution
 */
export enum ExceptionExecution {
    /** The exception execution  application defect */
    ApplicationDefect = 'Application Defect',
    /** The exception execution Locator Exceptions */
    LocatorExceptions = 'Locator Exceptions',
    /** The  exception execution Automation Script Errors */
    AutomationScriptErrors = 'Automation Script Errors',
    /** The  exception execution time out issue */
    TimeoutIssue = 'Time Out Issues',
    /** The  exception execution Connection Issues */
    ConnectionIssues = 'Connection Issues',
    /** The  exception execution script Defect */
    Miscellenous = 'Miscellenous'
}
/**
 * @author Hiren Tandel
 * @description provide the exception execution column
 */
export enum ExceptionExecutionColumn {
    /** The exception execution column execution */
    Execution = 'Execution',
    /** The exception execution  application defect */
    ApplicationDefect = 'Application Defect',
    /** The exception execution Locator Exceptions */
    LocatorExceptions = 'Locator Exceptions',
    /** The  exception execution Automation Script Errors */
    AutomationScriptErrors = 'Automation Script Errors',
    /** The  exception execution time out issue */
    TimeoutIssue = 'Time Out Issues',
    /** The  exception execution Connection Issues */
    ConnectionIssues = 'Connection Issues',
    /** The  exception execution script Defect */
    Miscellenous = 'Miscellenous'

}
/**
 * @author Hiren Tandel
 * @description proide the exception execution detail
 */
export class ExceptionExecutionDetail {
    /** The exception execution detail scenario steps */
    public scenarioSteps: string[];
    /** The exception execution detail scenario name */
    public scenarioName: string;
}

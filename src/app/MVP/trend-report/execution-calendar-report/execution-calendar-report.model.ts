/**
 * @author Hiren Tandel
 * @description provide the execution calender report 
 */
export class ExecutionCalender {
    /** The execution calender count */
    public executionCount: number;
    /** the execution calender date of execution */
    public executionDate: Date;
}
/**
 * @author Hiren Tandel
 * @description provide the execution calender details report
 */
export class ExecutionCalenderDetails {
    /** The execution calender executionId */
    public executionId: number;
    /** The execution calender date of execution */
    public moduleName: string;
    /** The execution calender  */
    public passed: number;
    /** The execution calender  */
    public failed: number;
    /** The execution calender  */
    public skipped: number;
}
/**
 * @author Hiren Tandel
 * @description provide the ApplicationSummaryStatus
 */
export enum ExecutionCalenderDetail {
    /** The execution calender executionId */
    ExecutionId = 'executionId',
    /** the application module name */
    ModuleName = 'moduleName',
    /** Execution Pass status */
    Passed = 'passed',
    /** Execution fail status */
    Failed = 'failed',
    /** Execution skip status */
    Skipped = 'skipped',
}

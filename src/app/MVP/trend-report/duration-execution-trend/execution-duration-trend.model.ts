/**
 * @author Hiren Tandel
 * @description provide the execution duration trend
 */
export class ExecutionDurationTrend {
    /** The execution Id */
    public executionId: number;
    /** Execution time duration */
    public timeDuration: number;
    /** Execution moduleName */
    public moduleName: string;
    /** Execution scenario name */
    public scenarioNames: string[];
}
/**
 * @author Hiren Tandel
 * @description provides the Query Parameters
 */
export class ExecutionDurationTrendParams {
    /** params */
    public id: number;
}
/**
 * @author Hiren Tandel
 * @description Provide the execution duration chart data.
 */
export enum ExecutionDurationChartData {
    /** The execution time duration */
    timeDuration = 'Time Duration',
    /** The execution duration id */
    executionId = 'Execution',
    /** Execution moduleName */
    moduleName= 'moduleName',

}

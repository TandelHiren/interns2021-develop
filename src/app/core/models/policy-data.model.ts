/**
 * Policy Model
 */
export declare class PolicyData {
    /**
     * Role(s) definde ins Policy Data
     */
    public roles: string | string[];
    /**
     * Permission(s) definde in Policy Data
     */
    public permissions: string | string[];
    constructor(data?: any);
}

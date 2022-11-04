/**
 * Environment configurations for Policy Module
 */
export declare class PolicyEnvironment {
    /** Endpoint URL */
    url: string;
    /** Client_ID / App_ID */
    clientId: string;
    /** Policy name associate with Clien_ID / App_ID */
    policyName: string;
    /** Storage type */
    storageType?: StorageType;
}
/**
 * Enum for Storage type
 */
export declare enum StorageType {
    /** Storage type localStorage */
    localStorage = "localStorage",
    /** Storage type sessionStorage */
    sessionStorage = "sessionStorage",
    /** Default Storage type */
    default = "sessionStorage"
}

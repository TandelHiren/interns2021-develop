
/** Model class for Tags list */
export class TagsList {
    /** Tag id of tags list */
    public tagId: number;
    /** Tag name of tags list */
    public tagName: string;
    /** Created by of tags list */
    public createdBy: string;
    constructor(
        tagId?: number,
        tagName?: string,
        createdBy?: string
    ) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.createdBy = createdBy;
    }
}

/** Model class for Tags Detail */
export class TagDetail {
    /** Tag id of tag detail */
    public tagId?: number
    /** Tag name of tag detail */
    public tagName: string;
    constructor(
        tagId?: number,
        tagName?: string,
    ) {
        this.tagId = tagId;
        this.tagName = tagName;
    }
}

/**  model class for Priority */
export class Priority {

    /** Priority id of priority */
    public priorityId: number;
    /** Priority name of priority */
    public priorityName: string;

    constructor(
        priorityId: number,
        priorityName: string
    ) {
        this.priorityId = priorityId;
        this.priorityName = priorityName;
    }
}


/**  model class for Screen request */
export class Screens {

    /** Screen name of screen request */
    public screenId: number;
    /** Screen name of screen request */
    public screenName: string;
    /** Screen url of screen request */
    public screenUrl: string;
    /** Active  of screen request */
    public active: boolean;
    constructor(
        screenId?: number,
        screenName?: string,
        screenUrl?: string,
        active?: boolean
    ) {
        this.screenId = screenId;
        this.screenName = screenName;
        this.screenUrl = screenUrl;
        this.active = active;
    }
}

/**  model class for ExecutionType */
export class ExecutionType {

    /** Execution id of ExecutionType */
    public executionId: number;
    /** ExecutionType name of ExecutionType */
    public executionType: string;
    /** Disable  of execution type */
    public disabled:boolean;

    constructor(
        executionId: number,
        executionType: string,
        disabled: boolean
    ) {
        this.executionId = executionId;
        this.executionType = executionType;
        this.disabled = disabled;
    }
}



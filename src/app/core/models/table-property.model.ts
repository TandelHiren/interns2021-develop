
/**
 * @author
 * @description This is for table property.
 */
/** Sort type */
export enum SortType {
    /** ascending order */
    Ascending = 'ASC',
    /** descending */
    Descending = 'DESC'
}

/** create class for pass params */
export class TableProperty <T = any> {
    /** pageNumber */
    public pageNumber: number;
    /** pageLimit */
    public pageLimit: number;
    /** sort */
    public sortBy: string;
    /** sort */
    public direction: string;
    /** search */
    public search: string;
    /** Filter  of table property */
    public filter: T;
    constructor(sortBy: string, pageNumber: number = 0, pageLimit: number = 30, direction: SortType = SortType.Descending, filter?:any) {
        this.sortBy = sortBy;
        this.pageLimit = pageLimit;
        this.pageNumber = pageNumber;
        this.direction = direction;
        this.filter =filter
    }
}


/**
 * provide ColumnChartConfig
 * @author Hiren Tandel
 */
export class ColumnChartConfig {
    /** provide title */
    public title: string;
    /** provide vAxis */
    public vAxis: string;
    /** provide hAxis */
    public hAxis: string;

    constructor(title: string, vAxis: string, hAxis: string) {
        this.title = title;
        this.vAxis = vAxis;
        this.hAxis = hAxis;
    }
}

/**
 * provide DonutChartConfig
 * @author Hiren Tandel
 */
export class DonutChartConfig {
    /** provide title */
    public title: string;
    /** provide pieHole */
    public pieHole: number

    constructor(title: string, pieHole: number) {
        this.title = title;
        this.pieHole = pieHole;
    }
}
/**
 * google chart base service
 * @author Hiren Tandel
 */

declare var google: any;
/** GoogleChartsBaseService */
export class GoogleChartsBaseService {
  constructor() {
    google.charts.load('current', { 'packages': ['corechart'] });
  }
  /**
   * buildChart encapsulate the callback definition,
   * the data mapping (Array to DataTable),
   * and the setOnLoadCallback method call
   * @param data
   * @param chartFunc
   * @param options
   */
  protected buildChart(data: any[], chartFunc: any, options: any): void {
    const func = (chartFunc, options) => {
      if(data && data.length >0){
        const datatable = google.visualization.arrayToDataTable(data);
        chartFunc().draw(datatable, options);
      }
    };
    const callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }

}
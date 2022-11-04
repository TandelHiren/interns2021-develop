/**
 * provide MultipleColumnChartService
 * @author Hiren Tandel
 */
import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';
declare var google: any;
/** MultipleColumnChartService */
@Injectable()
export class MultipleColumnChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  /**
   * provide BuildMultiColumnChart
   * @author Hiren Tandel
   */
  public BuildMultiColumnChart(multipleColumnChartElementId: String, data: any[], options: any): void {
    // document.getElementById(<string>multipleColumnChartElementId).innerHTML = '';
    const chartFunc = () => {
      return new google.visualization.ColumnChart(document.getElementById(<string>multipleColumnChartElementId));
    };

    this.buildChart(data, chartFunc, options);
  }
}

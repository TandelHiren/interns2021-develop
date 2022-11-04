/**
 * provide ColumnChartService
 * @author Hiren Tandel
 */
import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';

declare var google: any;

/** ColumnChartService */
@Injectable()
export class ColumnChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  /**
   * provide BuildColumnChart
   * @author Hiren Tandel
   */
  public BuildColumnChart(columnChartElementId: String, data: any[], options: any): void {
    const chartFunc = () => {
      return new google.visualization.ColumnChart(document.getElementById(<string>columnChartElementId));
    };
    this.buildChart(data, chartFunc, options);
  }
}

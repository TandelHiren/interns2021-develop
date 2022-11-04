/**
 * provide AreaChartService
 * @author Hiren Tandel
 */
import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';

declare var google: any;
/** AreaChartService */
@Injectable()
export class AreaChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  /**
   * provide AreaChart
   * @author Hiren Tandel
   */
  public BuildAreaChart(areaChartElementId: String, data: any[], options: any): void {
    document.getElementById(<string>areaChartElementId).innerHTML = '';
    const chartFunc = () => {
      return new google.visualization.AreaChart(document.getElementById(<string>areaChartElementId));
    };
    this.buildChart(data, chartFunc, options);
  }
}

import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';
declare var google: any;
/**
 * provide DonutChartService
 * @author Hiren Tandel
 */
@Injectable()
export class DonutChartService extends GoogleChartsBaseService {
  constructor() {
    super();
  }
  /**
   * provide BuildDonutChart
   * @author Hiren Tandel
   */
  public BuildDonutChart(donutChartElementId: String, data: any[], options: any): void {
    const chartFunc = () => {
      return new google.visualization.PieChart(document.getElementById(<string>donutChartElementId));
    };
    
    this.buildChart(data, chartFunc, options);
  }
}

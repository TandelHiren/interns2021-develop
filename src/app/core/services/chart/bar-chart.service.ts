import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';
import { ColumnChartConfig } from '../../models/google-chart.model';

declare var google: any;
/**
 * provide BarChartService
 * @author Hiren Tandel
 */
@Injectable()
export class BarChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  /**
   * provide BuildBarChart
   * @author Hiren Tandel
   */
  public BuildBarChart(barChartElementId: String, data: any[], options: any): void {
    if(data && data.length >0){
      const chartFunc = () => {
        return new google.visualization.BarChart(document.getElementById(<string>barChartElementId));
      };
      this.buildChart(data, chartFunc, options);
   }
  }
}

/**
 * provide PieChartService
 * @author Hiren Tandel
 */
import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';
import { DonutChartConfig } from '../../models/google-chart.model';
declare var google: any;
/** PieChartService */
@Injectable()
export class PieChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  /**
   * provide BuildPieChart
   * @author Brijesh Tailor
   */
  public BuildPieChart(pieChartElementId: String, data: any[], config: DonutChartConfig): void {
    const chartFunc = () => {
      return new google.visualization.PieChart(document.getElementById(<string>pieChartElementId));
    };
    const options = {
      title: config.title,
      pieHole: config.pieHole,
      width: 'auto',
      height: '100%',
      chartArea: {
        width: 'auto',
        height: '70%',
        top: '0',
        // left: '0',
        // right: '0'
      },
      pieStartAngle: 90,
      legend: {
        position: 'none',
        // position: 'right',
        // alignment: 'center',
        maxLines: 4,
        textStyle: {
          fontSize: 12,
          color: '#4c5c94'
        }
      },
      pieSliceText: 'percentage',

      slices: { 0: { color: '#424C9B' }, 1: { color: '#F9B50D' }, 2: { color: '#17AAB4' } },
    };

    this.buildChart(data, chartFunc, options);
  }
}

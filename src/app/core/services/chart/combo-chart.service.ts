/**
 * provide ComboChartService
 * @author Hiren Tandel
 */
import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-chart-base.service';
import { ColumnChartConfig } from '../../models/google-chart.model';

declare var google: any;
/** ComboChartService */
@Injectable()
export class ComboChartService extends GoogleChartsBaseService {
  
  constructor() {
    super();
  }

  /**
   * provide BuildComboChart
   * @author Hiren Tandel
   */
  public BuildComboChart(comboChartElementId: String, data: any[], config: ColumnChartConfig,
    hAxisTickData: any[], vAxisMaxValue: number): void {

    const chartFunc = () => {
      return new google.visualization.ComboChart(document.getElementById(<string>comboChartElementId));
    };
    const options = {
      title: '',
      width: 'auto',
      height: 'auto',
      chartArea: {
        width: 'auto',
        height: '80%',
        top: '0'
      },
      vAxis: {
        title: config.vAxis,
        viewWindow: {
          max: vAxisMaxValue
        },
        titleTextStyle: {
          fontSize: 12,
          color: '#4c5c94',
          // bold: true,
          italic: false
        },
        textStyle: { fontSize: 12, color: '#4c5c94' }
      },
      hAxis: {
        title: config.hAxis,
        titleTextStyle: {
          fontSize: 12,
          color: '#4c5c94',
          // bold: true,
          italic: false
        },
        textStyle: { fontSize: 12, color: '#4c5c94' },
        gridlines: {
          color: 'transparent'
        },
        baseline: 0,
        ticks: hAxisTickData,
        slantedText: true,
        // slantedTextAngle: 90,
        textPosition: 'out'
      },
      bar: { groupWidth: '35%' },
      legend: 'none',
      animation: {
        startup: true,   /* Need to add this for animations */
        duration: 1000,
        easing: 'out'
      },
      annotations: {
        alwaysOutside: true,
        stem: {
          length: 6,
          color: 'transparent'
        },
        textStyle: { fontSize: 12, color: '#4c5c94' }
      },
      seriesType: 'bars',
      series: { 1: { type: 'line', color: '#F9B50D', lineWidth: 2, pointSize: 5 } },
      pointsVisible: true
    };
    this.buildChart(data, chartFunc, options);
  }
}
/**
 * @author Hiren Tandel
 * @description Execution Duration Trend Component
 */
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
/** -------------------------------------------------------------- */
import { LoaderService } from '../../core';
import { HeaderConfiguration, TableConfiguration } from '../../shared';
import { TrendReportService } from '../service/trend-report.service';
import { ExecutionDurationChartData, ExecutionDurationTrend } from './execution-duration-trend.model';
import { ToastrService } from 'ngx-toastr';
import { TrendReportFilterService } from '../service/trend-report-filter.service';
import { ApplicationModule } from 'src/app/dashboard/dashboard.model';

declare let $: any;
declare let google: any;
/**
 * Execution duration trend
 */
@Component({
  selector: 'one-automation-execution-duration-trend',
  templateUrl: './execution-duration-trend.component.html',
  styleUrls: ['./execution-duration-trend.component.scss'],
})
export class ExecutionDurationTrendComponent implements OnInit {

  /** Host binding of execution duration trend component */
  @HostBinding('class') classes: string = 'd-flex flex-column h-100 overflow-hidden';
  /** Module list of application summary report component */
  @Input() public moduleList: ApplicationModule[] = [];
  /** View child of execution duration trend component */
  @ViewChild('chart') public chart: ElementRef;
  /** Save execution duration response */
  public executionAllData: ExecutionDurationTrend[];
  /** Determines whether table is shown or disabled  */
  public isTable: boolean;
  /** Application id of execution duration trend component */
  public applicationId: number;
  /** Listner$  of execution duration trend component */
  public listner$: Subscription;
  /** Table config of execution duration trend component */
  public tableConfig: TableConfiguration;
  /** Execution duration of execution duration trend component */
  public executionDuration: ExecutionDurationTrend[] = [];
  /** Duration chart column data of execution duration trend component */
  public durationChartColumnData: any[];
  /** Module id of execution duration trend component */
  public moduleId: number;
  /** Filter date of application summary report component */
  public filterDate: string;
  /** Get module id of application summary report component */
  public getModuleId: any
  constructor(
    private _trendReport: TrendReportService,
    private trendReportFilter: TrendReportFilterService,
    private activateRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
  ) {

    this.durationChartColumnData = [
      {
        columnType: 'string',
        columnValue: ExecutionDurationChartData.executionId
      },
      {
        columnType: 'number',
        columnValue: ExecutionDurationChartData.timeDuration
      }
    ];
    this.isTable = false;
  }
  /**
   * life cycle hook
   */
  public ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.applicationId = +paramMap.get('applicationId');
      this.getDurationTrendData(this.applicationId);
    });
    this.getModuleList();
  }
  /**
   * `
   * @author Hiren Tandel
   * @description receive filter data
   * @param filterDate: filter date by Report 
   */
  public receiveFilter(filterDate: any): void {
    const filterItem: { [key: string]: string | number[] | number } = {
      applicationId: this.applicationId,
      moduleIds: filterDate.selectedModuleId,
      fromDate: filterDate.selectedFormDate,
      toDate: filterDate.selectedToDate
    }
    this.trendReportFilter.getDurationFilterdata(filterItem).subscribe((data) => {
      this.loaderService.displayLoader(false);
      this.executionDuration = data;
      this.executionAllData = data;
      this.drawChart(this.executionDuration, 'bar');
      this.getExecutionList();
    })
  }
  /**
   * Gets module list
   * @author Hiren Tandel
   */
  public getModuleList(): void {
    this.trendReportFilter.getModuleById(this.applicationId).subscribe((response: ApplicationModule[]) => {
      this.moduleList = response;
    })
  }
  /**
   * `
   * @author Hiren Tandel
   * @description get ExecutionDurationTrend data
   * @param value
   */
  public getDurationTrendData(applicationId: number): void {
    this.loaderService.displayLoader(true);
    const applicationData: any = {
      applicationId: this.applicationId,
      moduleIds: [],
      fromDate: '',
      toDate: ''
    }
    this.trendReportFilter.getDurationFilterdata(applicationData)
      .subscribe((data: any) => {
        // data = [];
        if (data.length > 0) {
          // console.log('durationData---->', data);
          this.loaderService.displayLoader(false);
          this.executionAllData = data; // todo
          this.executionDuration = data;
          this.drawChart(this.executionDuration, 'bar');
          this.getExecutionList();
        } else {
          //  this.toaster.error('Chart data not found', 'Duration Execution Trend Report', { closeButton: true });
        }
      }
      );
  }
  /**
   * @author Hiren Tandel
   * @description  Load the Visualization API and the bar chart package.
   * Set a callback to run when the Google Visualization API is loaded.
   * @param data
   * @param chartType
   */
  public drawChart(data: any, chartType: string): void {
    google.charts.load('current', { packages: ['corechart', chartType] });
    google.charts.setOnLoadCallback(() => {
      this.createDrawChart(data);
    });
  }
  /**
   * @author Hiren Tandel
   * @description  Callback that creates and populates a data table,
   * instantiates the bar chart, passes in the data and draws it.
   * @param data
   */
  public createDrawChart(chartData: any): void {
    const data: any = chartData.length > 10 ? chartData.slice(0, 10) : chartData;
    setTimeout(() => {
      // Define the chart to be drawn.
      const dataTable: any = new google.visualization.DataTable();
      this.durationChartColumnData.forEach((config: any) => {
        dataTable.addColumn(config.columnType, config.columnValue);
      });
      for (const row of data) {
        // let message: string = '';
        // row.scenarioNames.forEach((item: string) => {
        //   message = message === '' ? item : message + '\n' + item;
        // });
        dataTable.addRow(['#' + row.executionId, row.timeDuration]);
      }
      // Set chart options
      const options: any = {
        bars: 'horizontal',
        // bar: {
        //   groupWidth: 20
        // },
        // legend: { position: 'top', alignment: 'end' },
        legend: 'none',
        backgroundColor: 'transparent',
        series: [
          { color: '#507fd5' }
        ],
        hAxis: {
          title: 'Time Duration (Seconds)',
          format: '0',
          titleTextStyle: {
            bold: true,
            fontName: 'Poppins'
          },
          //  minValue: 0,
          fontStyle: 'Poppins'
        },
        vAxis: {
          title: 'Executions',
          format: '0',
          titleTextStyle: {
            bold: true,
            fontName: 'Poppins'
          },
          fontStyle: 'Poppins'
        }
      };

      // Instantiate and draw our chart, passing in some options.
      const chart: any = new google.visualization.BarChart(this.chart.nativeElement);
      // this.listner$ = google.visualization.events.addListener(chart, 'select', () => {
      //   this.selectHandler(chart, dataTable);
      // });
      chart.draw(dataTable, options);
      // make google chart responsive
      $(window).resize(() => {
        chart.draw(dataTable, options);
      });
    }, 100);

  }
  /**
   * @author Hiren Tandel
   * @description  select on particular bar then call it select handler everytime.
   * @param chart  to-do
   * @param dataTable to-do
   */
  public selectHandler(chart: any, dataTable: any): void {
    const selectedItem: any = chart.getSelection()[0];
    if (selectedItem) {
      const topping: any = dataTable.getValue(selectedItem.row, 0);
      const data: any = topping.split('#')[1];
      const value: number = Math.abs(data);
      // this.getExecutionList(value);
      this.clickTable(value);
    }
  }
  /**
   * @author Hiren Tandel
   * @description when user click on chart
   * @param executionId 
   * @param statusColumn 
   */
  public clickTable(executionId: number) {

    this._trendReport.getDurationExecutionTrend(executionId).subscribe((response: any) => {
      response.forEach((element: any) => {
        element.executionId = executionId;

      });

      this.isTable = true;
      this.initPropsForConstructor();
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExecutionDurationTrend[] = [...this.executionDuration.map((executionDuration: ExecutionDurationTrend) => {
        return executionDuration;
      })];
      this.tableConfig.tableBodyConfig.data = response;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    });

  }

  /**
   * @author Hiren Tandel
   * @description getting the Execution list
   * @param value
   */
  private getExecutionList(): void {
    this.isTable = true;
    this.initPropsForConstructor();
    this.fetchExecutionTrendData();
  }
  /**
   * @author Hiren Tandel.
   * @description initializes the properties for constructor.
   */
  private initPropsForConstructor(): void {
    this.tableConfig = {
      tableConfig: {

      },
      tableHeaderConfig: {
        header: this.getTableHeader()
      },
      tableBodyConfig: {
        data: []
      }
    };
  }
  /**
   * @author Hiren Tandel.
   * @description returns the header for table header.
   */
  private getTableHeader(): HeaderConfiguration[] {
    return [
      { headerTitle: 'Execution Id', headerClass: 'width-8', headerId: 'executionId' },
      { headerTitle: 'Module Name', headerClass: 'width-12', headerId: 'moduleName' },
      { headerTitle: 'Scenario Name', headerClass: 'width-12 white-space-pre-line', headerId: 'scenarioNames' },
      { headerTitle: 'Scenario Duration (m/s)', headerClass: 'width-8 white-space-pre-line', headerId: 'scenarioDuration' },
      // { headerTitle: 'Time Duration', headerClass: 'width-8', headerId: 'timeDuration' }
    ];
  }
  /**
   * fetching all trend data and set to the table config.
   * @param value
   */
  private fetchExecutionTrendData(): void {
    if (this.executionAllData && this.executionAllData.length && this.isTable) {
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExecutionDurationTrend[] = [...this.executionAllData.map((executionDuration: ExecutionDurationTrend) => {
        return executionDuration;
      })];
      filterData.forEach((element: any) => {
        let scenarioName: string = '';
        element.scenarioNames.forEach((data: any) => {
          scenarioName = scenarioName !== '' ? scenarioName + '\n' + data : data;

        });
        element.scenarioNames = scenarioName;
        let scenarioDuration: string = '';
        element.scenarioDuration.forEach((data: any) => {
          scenarioDuration = scenarioDuration !== '' ? scenarioDuration + '\n' + data : data;

        });
        element.scenarioDuration = scenarioDuration;
      });
      // const setExecutionData: any = [];
      //setExecutionData.push(filterData.find((rc: ExecutionDurationTrend) => rc.executionId === value));
      // console.log('setExecutionData', setExecutionData);
      this.tableConfig.tableBodyConfig.data = filterData;
      this.tableConfig = { ...config };
      // this.user = this.getAsyncData().pipe(share());

      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    }
  }
}

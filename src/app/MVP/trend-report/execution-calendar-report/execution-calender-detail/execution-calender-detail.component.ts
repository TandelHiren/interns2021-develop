import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../../core';
import { HeaderConfiguration, TableConfiguration } from '../../../shared';
import { TrendReportService } from '../../service/trend-report.service';
import { ExecutionCalenderDetail, ExecutionCalenderDetails } from '../execution-calendar-report.model';

declare let google: any;
declare let $: any;

@Component({
  selector: 'one-automation-execution-calender-detail',
  templateUrl: './execution-calender-detail.component.html',
  styleUrls: ['./execution-calender-detail.component.scss'],
})
export class ExecutionCalenderDetailComponent implements OnInit {
  /** chart_div  */
  @ViewChild('chart') public chart: ElementRef;

  /**
   * store module execution trend response
   */
  /**
   *  table to-do
   */
  public isTable: boolean;
  /**
   *  listner to-do
   */
  public listner$: Subscription;
  /**
   * the table configuration.
   */
  public tableConfig: TableConfiguration;
  /**
   * module execution Trend report
   */
  public executionCalenderDetail: ExecutionCalenderDetails[] = [];
  /** to-do */
  public executionCalenderDetailsColumnData: any[];
  /**
   * applicationId
   */
  public applicationId: number;
  /**
   * executionCalenderDetails
   */
  public _executionCalenderDetails: ExecutionCalenderDetails[];
  /**
   * child component
   */
  @Input() public set executionCalenderDetails(value: ExecutionCalenderDetails[]) {
    if (value) {
    
      this._executionCalenderDetails = value;
      this.drawChart(value);
    }
  }
  public get executionCalenderDetails(): ExecutionCalenderDetails[] {
    return this._executionCalenderDetails;
  }

  constructor(
    private _trendReport: TrendReportService,
    private cdr: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private loaderService: LoaderService,
    // private moduleExecutionTrendAdapter: ModuleExecutionDetailsAdapter,
  ) {
    this.executionCalenderDetailsColumnData = [
      {
        columnType: 'string',
        columnValue: ExecutionCalenderDetail.ModuleName,
      },
      {
        columnType: 'number',
        columnValue: ExecutionCalenderDetail.Passed,
      },
      {
        columnType: 'number',
        columnValue: ExecutionCalenderDetail.Failed,
      },
      {
        columnType: 'number',
        columnValue: ExecutionCalenderDetail.Skipped,
      },
      {
        columnType: 'string',
        columnValue: ExecutionCalenderDetail.ExecutionId,
      },
    ];
    this.isTable = false;
  }
  /**
   * life cycle hook
   */
  public ngOnInit(): void {

    // this.drawChart();
  }

  /**
   * @author Hiren Tandel
   * @description Load the Visualization API and the corechart package.
   * Set a callback to run when the Google Visualization API is loaded.
   * @param data to-do
   */
  public drawChart(data: any): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { packages: ['corechart'] });
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => {
      this.createDrawChart(data);
    });

  }
  /**
   * @author Hiren Tandel
   * @description Callback that creates and populates a data table,
   *  instantiates the stacked chart, passes in the data and draw it.
   * @param chartData last five execution show
   */
  public createDrawChart(chartData: any): void {
    const data: any = chartData.length > 5 ? chartData.slice(0, 5) : chartData;
    const dataTable: any = new google.visualization.DataTable();
    this.executionCalenderDetailsColumnData.forEach((config: any) => {
      dataTable.addColumn(config.columnType, config.columnValue);
    });

    for (const row of data) {
      const calenderDetailsRowData: any = [];
      for (const col of this.executionCalenderDetailsColumnData) {
        if (col.columnValue === ExecutionCalenderDetail.ExecutionId) {
          calenderDetailsRowData.push(row[col.columnValue].toString());
        } else {
          calenderDetailsRowData.push(row[col.columnValue]);
        }
      }
      dataTable.addRow([...calenderDetailsRowData]);
    }
    // Set chart options
    const options: any = {
      format: '0',
      is3D: true,
      backgroundColor: 'transparent'
    };
    // Instantiate and draw our chart, passing in some options.
    const chart: any = new google.visualization.PieChart(this.chart.nativeElement);
    // Every time the table fires the "select" event, it should call selectHandler() function.
    this.listner$ = google.visualization.events.addListener(chart, 'select', () => {
      this.selectHandler(chart, dataTable);
    });
    chart.draw(dataTable, options);
    // google chart responsive.
    $(window).resize(() => {
      chart.draw(dataTable, options);
    });
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
      const statusColumn: number = selectedItem.column;
      const topping: any = dataTable.getValue(selectedItem.row, 0);
      const data: any = topping.split('#')[1];
      const value: number = Math.abs(data);
      this.getModuleExecutionList(value, statusColumn);
    }
  }
  /**
   * @author Hiren Tandel
   * @description getting the module execution list
   * @param topping
   */
  private getModuleExecutionList(value: number, statusColumn: number): void {
    this.isTable = true;
    this.initPropsForConstructor();
    this.fetchExecutionTrendData(value, statusColumn);
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
        header: this.getTableHeader(),
      },
      tableBodyConfig: {
        data: [],
      },
    };
  }
  /**
   * @author Hiren Tandel.
   * @description returns the header for table header.
   */
  private getTableHeader(): HeaderConfiguration[] {
    return [
      { headerTitle: 'ID', headerClass: 'width-8', headerId: 'executionId' },
      { headerTitle: 'module Name', headerClass: 'width-12', headerId: 'moduleName' },
      { headerTitle: 'Status', headerClass: 'width-24', headerId: 'status' },
      // { headerTitle: 'Scenario Steps', headerClass: 'width-24', headerId: 'scenarioSteps' },
    ];
  }
  /**
   * fetching all trend data and set to the table config.
   * @param value
   */
  private fetchExecutionTrendData(executionId: number, statusColumn: number): void {
    if (this.executionCalenderDetails && this.executionCalenderDetails.length && this.isTable) {
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExecutionCalenderDetails[] =
        [...this.executionCalenderDetails.map((executionDuration: ExecutionCalenderDetails) => {
          return executionDuration;
        })];

      let status: string;
      if (statusColumn === 1) {
        status = ExecutionCalenderDetail.Passed;
      } else if (statusColumn === 2) {
        status = ExecutionCalenderDetail.Failed;
      } else if (statusColumn === 3) {
        status = ExecutionCalenderDetail.Skipped;
      }
      const executionTrend: any = filterData.find((rc: any) => rc.executionId === executionId);
      if (executionTrend) {
        this._trendReport.getModuleExecutionDetailsReport(executionId, status).subscribe((response: any) => {
          //  console.log('deatils--->', response);
          response.forEach((element: ExecutionCalenderDetails) => {
            element.moduleName = status;
          });
          this.tableConfig.tableBodyConfig.data = response;
          this.tableConfig = { ...config };
          /** When invoke this method is update the dom */
          this.cdr.detectChanges();
        });
      }
    }
  }

}

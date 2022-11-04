import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../core';
/** -------------------------------------------------------------- */
import { HeaderConfiguration, TableConfiguration } from '../../shared';
import { TrendReportService } from '../service/trend-report.service';
import {
  ExecutionTrend, ModuleExecutionDetailsReport,
  ModuleExecutionDetailsReportList, ModuleExecutionDetailsReportReponse,
  ModuleExecutionTrend, ScenarioResource,
} from './execution-trend.model';
import { ModuleExecutionDetailsAdapter } from './module-execution-adapter/module-execution.adapter';
import { ToastrService } from 'ngx-toastr';
import { TrendReportFilterService } from '../service/trend-report-filter.service';
import { ApplicationModule } from 'src/app/dashboard/dashboard.model';

declare let google: any;
declare let $: any;
/**
 * module execution trend
 */
@Component({
  selector: 'one-automation-execution-trend',
  templateUrl: './execution-trend.component.html',
  styleUrls: ['./execution-trend.component.scss'],
  viewProviders: [ModuleExecutionDetailsAdapter],
})
export class ExecutionTrendComponent implements OnInit, OnDestroy {
  
  /**
   * Host binding of exception trend component
   */
  @HostBinding('class') classes = 'd-flex flex-column h-100 overflow-hidden';
  /** Module list of application summary report component */
  @Input() public moduleList = [];
  /** View child of execution trend component */
  @ViewChild('chart') public chart: ElementRef;
  /**
   * store module execution trend response
   */
  public moduleExecutionData: ExecutionTrend[];
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
   * execution
   */
  public execution: Array<any> = [];
  /**
   * module execution Trend report
   */
  public executionTrend: ExecutionTrend[] = [];
  /** to-do */
  public moduleExecutionColumnData: any[];
  /**
   * applicationId
   */
  public applicationId: number;
  /**
   * moduleId
   */
  public moduleId: number;
  /** Filter date of application summary report component */
  public filterDate: string;
  /**
   * Get module id of application summary report component
   */
  public getModuleId: any
  constructor(
    private _trendReport: TrendReportService,
    private trendReportFilter: TrendReportFilterService,
    private cdr: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private moduleExecutionTrendAdapter: ModuleExecutionDetailsAdapter,
    private loaderService: LoaderService,
    private toaster: ToastrService
  ) {
    this.moduleExecutionColumnData = [
      {
        columnType: 'string',
        columnValue: ModuleExecutionTrend.ExecutionId
      },
      {
        columnType: 'number',
        columnValue: ModuleExecutionTrend.Passed
      },
      {
        columnType: 'number',
        columnValue: ModuleExecutionTrend.Failed
      },
      {
        columnType: 'number',
        columnValue: ModuleExecutionTrend.Skipped
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
      this.getExecutionTrendData(this.applicationId);
    });
    this.getModuleList();
  }
  /**
   * Receives filter
   * @param filterDate: filter date by Report 
   */
  public receiveFilter(filterDate) {
    const filterItem: { [key: string]: string | number[] | number} = {
      applicationId: this.applicationId,
      moduleIds:filterDate.selectedModuleId ,
      fromDate: filterDate.selectedFormDate,
      toDate: filterDate.selectedToDate
    }
    
    this.trendReportFilter.getExecutionFilterdata(filterItem).subscribe((data) => {
      this.loaderService.displayLoader(false);
      this.moduleExecutionData = data;
      this.executionTrend = data;

      this.drawChart(this.executionTrend);
      this.getModuleExecutionList();
    })
  }
  /**
   * Gets module list
   * @author Hiren Tandel
   */
  public getModuleList(): void {
    this.trendReportFilter.getModuleById(this.applicationId).subscribe((response: ApplicationModule[] ) => {
      this.moduleList = response;
    })
  }
  // /**
  //  * getApplicationById
  //  * @param applicationId
  //  */
  // public getApplicationById(applicationId: number) {
  //   this._trendReport.getApplicationById(applicationId).subscribe((response: any) => {
  //     //  console.log('duration response--->', response);
  //     if (response.modules.length >= 1) {
  //       this.moduleId = response.modules[response.modules.length - 1].moduleId;
  //       this.getExecutionTrendData(this.applicationId);
  //     }
  //   });
  // }
  /**
   * life cycle hook to-do
   */
  public ngOnDestroy(): void {
    if (this.listner$) {
      // this.listner$.unsubscribe();
    }
  }
  /**
   * getExecutionTrendData
   */
  public getExecutionTrendData(applicationId: number): void {
    this.loaderService.displayLoader(true);
    const applicationData: any = {
      applicationId: this.applicationId,
      moduleIds: [],
      fromDate: '',
      toDate: ''
    }
    this.trendReportFilter.getExecutionFilterdata(applicationData)
      // tslint:disable-next-line:no-any
      .subscribe((data: any) => {
        // data = [];
        if (data.length > 0) {
          //    console.log('executionTrendData', data);
          this.loaderService.displayLoader(false);
          this.moduleExecutionData = data;
          this.executionTrend = data;

          this.drawChart(this.executionTrend);
          this.getModuleExecutionList();

        } else {
          //  this.toaster.error('Chart data not found', 'Module Execution Trend Report', { closeButton: true });
        }
      });

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
    const data: any = chartData.length > 10 ? chartData.slice(0, 10) : chartData;
    // const data1: any = [];
    // data1.push(['Execution', 'passed', 'failed', 'skipped']);
    // for (const row of data) {
    //   data1.push(['Execution #' + row.executionId, row.passed, row.failed, row.skipped]);
    // }

    // Create the data table.
    const dataTable: any = new google.visualization.DataTable();
    this.moduleExecutionColumnData.forEach((config: any) => {
      dataTable.addColumn(config.columnType, config.columnValue);
    });

    for (const row of data) {
      const passedMessage: string = '';
      const failedMessage: string = '';
      const skippedMessage: string = '';
      dataTable.addRow(['#' + row.executionId, row.passed, row.failed, row.skipped]);
      //  dataTable.addRow([ row.executionId, row.passed, row.failed, row.skipped]);
    }
    // Set chart options
    const options: any = {
     // legend: { position: 'top', alignment: 'end' },
     legend:'none',
      isStacked: true,
      backgroundColor: 'transparent',
      bar: { groupWidth: '20%' },
      series: [
        { color: '#07bdff' },// Pass #d95f02 
        { color: '#fa2e57' }, // Fail #ff5a5d
        { color: '#6c757d' }  // Skip #7570b3
      ],
      hAxis: {
        title: 'Executions',
        format: '0',
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },
        //  minValue: 0,
        fontStyle: 'Poppins'
      },
      vAxis: {
        vAxis: {minValue: 0},
        title: 'Test Cases',
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },
        format: '0',
        fontStyle: 'Poppins'
      }
    };
    // Instantiate and draw our chart, passing in some options.
    const chart: any = new google.visualization.ColumnChart(this.chart.nativeElement);
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
      // this.getModuleExecutionList(value, statusColumn);
      this.clickTable(value, statusColumn);
    }
  }
  /**
   * @author Hiren Tandel
   * @description when user click on chart
   * @param executionId 
   * @param statusColumn 
   */
  public clickTable(executionId: number, statusColumn: number) {

    let status: string;
    if (statusColumn === 1) {
      status = ModuleExecutionTrend.Passed;
    } else if (statusColumn === 2) {
      status = ModuleExecutionTrend.Failed;
    } else if (statusColumn === 3) {
      status = ModuleExecutionTrend.Skipped;
    }
    this._trendReport.getApplicationSummuryDetails(executionId, status.toUpperCase()).subscribe((response: any) => {

      let data: ExecutionTrend = this.moduleExecutionData.find((item: ExecutionTrend) => item.executionId === executionId);
      if (data) {
        response.forEach((element: any) => {
          // element.status = status;
          element.executionId = executionId;
          element.moduleName = data.moduleName;
        });
      }

      this.isTable = true;
      this.initPropsForConstructor('Scenario steps', 'stepdetail');
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ScenarioResource[] = [...response.map((executionDuration: ScenarioResource) => {
        return executionDuration;
      })];
      filterData.forEach((element: any) => {
        let stepdetail: string = '';
        element.stepdetail.forEach((data: any) => {
          stepdetail = stepdetail !== '' ? stepdetail + '\n' + data : data;

        });
        element.stepdetail = stepdetail;
      });

      this.tableConfig.tableBodyConfig.data = filterData;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    });

  }
  /**
   * @author Hiren Tandel
   * @description getting the module execution list
   * @param topping
   */
  private getModuleExecutionList(): void {
    this.isTable = true;
    this.initPropsForConstructor('Scenario steps', 'scenarioSteps');
    this.fetchExecutionTrendData();
  }
  /**
   * @author Hiren Tandel.
   * @description initializes the properties for constructor.
   */
  private initPropsForConstructor(headerTitle: string, headerId: string): void {
    this.tableConfig = {
      tableConfig: {

      },
      tableHeaderConfig: {
        header: this.getTableHeader(headerTitle, headerId)
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
  private getTableHeader(headerTitleValue: string, headerIdValue: string): HeaderConfiguration[] {
    return [
      { headerTitle: 'Execution Id', headerClass: 'width-8', headerId: 'executionId' },
      { headerTitle: 'Module Name', headerClass: 'width-12', headerId: 'moduleName' },
      { headerTitle: headerTitleValue, headerClass: 'width-24 white-space-pre-line', headerId: headerIdValue },
      // { headerTitle: 'Scenario Steps', headerClass: 'width-24', headerId: 'scenarioSteps' },
      { headerTitle: 'Status', headerClass: 'width-8 white-space-pre-line', headerId: 'status' }
    ];
  }
  /**
   * fetching all trend data and set to the table config.
   * @param value
   */
  private fetchExecutionTrendData(): void {
    this.isTable = true;
    this.initPropsForConstructor('Scenario Name', 'scenarioName');
    if (this.moduleExecutionData && this.moduleExecutionData.length && this.isTable) {
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExecutionTrend[] =
        [...this.moduleExecutionData.map((executionDuration: ExecutionTrend) => {
          return executionDuration;
        })];
      filterData.forEach((element: any) => {
        let scenarioName: string = '';
        element.scenarioResource.forEach((data: any) => {
          scenarioName = scenarioName !== '' ? scenarioName + '\n' + data.scenarioName : data.scenarioName;

        });
        element.scenarioName = scenarioName;

        let status: string = '';
        element.scenarioResource.forEach((data: any) => {
          status = status !== '' ? status + '\n' + data.status : data.status;

        });
        element.status = status;
      });
      this.tableConfig.tableBodyConfig.data = filterData;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    }
  }
}

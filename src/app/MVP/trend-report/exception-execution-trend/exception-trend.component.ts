import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
/** -------------------------------------------------------------- */
import { LoaderService } from '../../core';
import { HeaderConfiguration, TableConfiguration } from '../../shared';
import { TrendReportService } from '../service/trend-report.service';
import { ExceptionExecution, ExceptionExecutionColumn, ExceptionTrend } from './exception-trend.model';
import { ToastrService } from 'ngx-toastr';
import { TrendReportFilterService } from '../service/trend-report-filter.service';
import { ApplicationModule } from 'src/app/dashboard/dashboard.model';

declare let google: any;
declare let $: any;
/**
 * Exception trend component
 */
@Component({
  selector: 'one-automation-exception-trend',
  templateUrl: './exception-trend.component.html',
  styleUrls: ['./exception-trend.component.scss'],
})
export class ExceptionTrendComponent implements OnInit {

  /**
   * Host binding of exception trend component
   */
  @HostBinding('class') classes = 'd-flex flex-column h-100 overflow-hidden';
  /** Module list of application summary report component */
  @Input() public moduleList = [];
  /** View child of exception trend component for getting the chart ref */
  @ViewChild('chart') public chart: ElementRef;
  /** Store the exception trend response */
  public executionAllData: ExceptionTrend[];
  /** Determines whether table is shown or not */
  public isTable: boolean;
  /** Listner$  of exception trend component */
  public listner$: Subscription;
  /** the table configuration. */
  public tableConfig: TableConfiguration;
  /** ExceptionTrend model data */
  public exceptionTrend: ExceptionTrend[] = [];
  /** Exception execution column data of exception trend component */
  public ExceptionExecutionColumnData: any[];
  /** Application id of exception trend component */
  public applicationId: number;
  /** Module id of exception trend component */
  public moduleId: number;
  /** Find excution id of exception trend component */
  public findExcutionId: number;

  constructor(
    private _trendReport: TrendReportService,
    private trendReportFilter: TrendReportFilterService,
    private cdr: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private loaderService: LoaderService,
  ) {
    this.ExceptionExecutionColumnData = [
      {
        columnType: 'string',
        columnValue: ExceptionExecutionColumn.Execution
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.ApplicationDefect
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.LocatorExceptions
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.AutomationScriptErrors
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.TimeoutIssue
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.ConnectionIssues
      },
      {
        columnType: 'number',
        columnValue: ExceptionExecutionColumn.Miscellenous
      }
    ];
    this.isTable = false;
    // this.initPropsForConstructor();
  }
  /**
   * life cycle hook
   */
  public ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.applicationId = +paramMap.get('applicationId');
      this.getExceptionExecution(this.applicationId);
    });
    this.getModuleList();
  }
  /**
   * Receives filter
   * @param filterDate: filter date by Report 
   */
  public receiveFilter(filterDate): void {
    const filterItem: { [key: string]: string | number[] | number } = {
      applicationId: this.applicationId,
      moduleIds: filterDate.selectedModuleId,
      fromDate: filterDate.selectedFormDate,
      toDate: filterDate.selectedToDate
    }

    this.trendReportFilter.getExceptionFilterdata(filterItem).subscribe((data) => {
      this.loaderService.displayLoader(false);
      // console.log('exceptionTrendData', data);
      this.executionAllData = data;
      this.exceptionTrend = data;
      this.drawChart(data);
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
  // /**
  //  * getApplicationById
  //  * @param applicationId
  //  */
  // public getApplicationById(applicationId: number) {
  //   this._trendReport.getApplicationById(applicationId).subscribe((response: any) => {


  //   });
  // }
  /**
   * @author Hiren Tandel
   * @description get the exception execution data.
   */
  public getExceptionExecution(applicationId: number): void {
    this.loaderService.displayLoader(true);
    const applicationData: any = {
      applicationId: this.applicationId,
      moduleIds: [],
      fromDate: '',
      toDate: ''
    }
    this.trendReportFilter.getExceptionFilterdata(applicationData)
      .subscribe((data: any) => {
        //  data = [];
        if (data.length > 0) {
          this.loaderService.displayLoader(false);
          // console.log('exceptionTrendData', data);
          this.executionAllData = data;
          this.exceptionTrend = data;
          this.drawChart(data);
          this.getExecutionList();
        } else {
          //   this.toaster.error('Chart data not found', 'Exception Execution Trend Report', { closeButton: true });
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
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.createDrawChart(data));
  }
  /**
   * @author Hiren Tandel
   * @description Callback that creates and populates a data table,
   *  instantiates the stacked chart, passes in the data and draw it.
   * @param data to-do
   */
  public createDrawChart(chartData: any): void {
    const data: any = chartData.length > 10 ? chartData.slice(0, 10) : chartData;
    // Create the data table.
    const dataTable: any = new google.visualization.DataTable();
    this.ExceptionExecutionColumnData.forEach((config: any) => {
      dataTable.addColumn(config.columnType, config.columnValue);
    });
    for (const row of data) {
      let appDefectCount: number = 0;
      let locatorExceptionCount: number = 0;
      let automationScriptDefectCount: number = 0;
      let timeOutDefectCount: number = 0;
      let connectionIssueCount: number = 0;
      let miscellenousCount: number = 0;
      row.exceptionResources.forEach((item: any) => {
        if (item.exceptionName === ExceptionExecution.ApplicationDefect) {
          appDefectCount = item.exceptionCount;
        } else if (item.exceptionName === ExceptionExecution.LocatorExceptions) {
          locatorExceptionCount = item.exceptionCount;
        } else if (item.exceptionName === ExceptionExecution.AutomationScriptErrors) {
          automationScriptDefectCount = item.exceptionCount;
        } else if (item.exceptionName === ExceptionExecution.TimeoutIssue) {
          timeOutDefectCount = item.exceptionCount;
        } else if (item.exceptionName === ExceptionExecution.ConnectionIssues) {
          connectionIssueCount = item.exceptionCount;
        } else if (item.exceptionName === ExceptionExecution.Miscellenous) {
          miscellenousCount = item.exceptionCount;
        }
      });
      dataTable.addRow(['#' + row.executionId, appDefectCount, locatorExceptionCount, automationScriptDefectCount,
        timeOutDefectCount, connectionIssueCount, miscellenousCount]);
    }
    // Set chart options
    const options: any = {
      legend: {
        position: 'top',
        alignment: 'end',
        textStyle: {
          fontSize: 12
        }
      },
      pointSize: 5,
      // isStacked: 'true',
      //  isStacked: 'relative',
     // areaOpacity: 0.4,
      backgroundColor: 'transparent',
      series: [
        { color: '#ec407a' }, // ApplicationDefect
        { color: '#7c4dff' }, // LocatorExceptions
        { color: '#4dd0e1' }, // AutomationScriptErrors
        { color: '#f2c4a5' }, // TimeoutIssue 
        { color: '#fdd835' }, // ConnectionIssues
        // { color: '#01bfa5' }, // infrastructure defect
        { color: '#ff9d00' }, // Miscellenous
      ],
      hAxis: {
        // minValue: 0,
        title: 'Executions',
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },

        fontStyle: 'Poppins'
      },
      vAxis: {
        vAxis: { minValue: 0 },
        format: '0',
        title: 'Test Cases',
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },

        fontStyle: 'Poppins'
      }
    };
    // Instantiate and draw our chart, passing in some options.
    const chart: any = new google.visualization.AreaChart(this.chart.nativeElement);
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
  public selectHandler(chart, dataTable): void {
    const selectedItem: any = chart.getSelection()[0];
    if (selectedItem) {
      const statusColumn: number = selectedItem.column;
      const topping: any = dataTable.getValue(selectedItem.row, 0);
      // console.log('topping here', topping);
      const data: any = topping.split('#')[1];
      const value: number = Math.abs(data);
      let a = this.exceptionTrend.find((item: ExceptionTrend) => item.executionId === value);
      this.findExcutionId = a.executionId;
      this.getExecutionTrendDatOnClick(value, a.exceptionName, statusColumn);

    }
  }
  /**
   * @author Hiren Tandel
   * @description getting the exception execution list
   * @param value
   * @param details
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
      { headerTitle: 'Execution ID', headerClass: 'width-8', headerId: 'executionId' },
      { headerTitle: 'Module Name', headerClass: 'width-12 white-space-pre-line', headerId: 'moduleName' },
      { headerTitle: 'Exception Name', headerClass: 'width-12 white-space-pre-line', headerId: 'exceptionName' },
      { headerTitle: 'ExceptionCount', headerClass: 'width-8 white-space-pre-line', headerId: 'exceptionCount' }
    ];
  }
  /**
   * @author Hiren Tandel
   * @description getting the exception execution list
   * @param value
   * @param details
   */
  private getExecutionTrendDatOnClick(value: number, exceptionName: string, statusColumn): void {
    this.isTable = true;
    this.initPropsForConstructorOnClick();
    this.fetchExecutionTrendDataOnClick(value, exceptionName, statusColumn);
  }
  /**
   * @author Hiren Tandel.
   * @description initializes the properties for constructor.
   */
  private initPropsForConstructorOnClick(): void {
    this.tableConfig = {
      tableConfig: {

      },
      tableHeaderConfig: {
        header: this.getExecptionTableHeader()
      },
      tableBodyConfig: {
        data: []
      }
    };
  }
  /** table */
  private getExecptionTableHeader(): HeaderConfiguration[] {
    return [
      { headerTitle: 'ID', headerClass: 'width-8', headerId: 'executionId' },
      { headerTitle: 'Module Name', headerClass: 'width-12', headerId: 'moduleName' },
      { headerTitle: 'Scenario Name', headerClass: 'width-12', headerId: 'scenarioName' },
      { headerTitle: 'Scenario Step', headerClass: 'width-12', headerId: 'scenarioStep' },
      { headerTitle: 'Exception Name', headerClass: 'width-12', headerId: 'exception' },
      { headerTitle: 'Status', headerClass: 'width-12', headerId: 'status' }
    ];
  }
  /**
   * fetching all trend data and set to the table config.
   * @param value
   */
  private fetchExecutionTrendData(): void {
    this.isTable = true;
    this.initPropsForConstructor();
    if (this.exceptionTrend && this.exceptionTrend.length && this.isTable) {
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExceptionTrend[] =
        [...this.exceptionTrend.map((executionDuration: ExceptionTrend) => {
          return executionDuration;
        })];
      filterData.forEach((element: any) => {
        let exceptionName: string = '';
        element.exceptionResources.forEach((data: any) => {
          exceptionName = exceptionName !== '' ? exceptionName + '\n' + data.exceptionName : data.exceptionName;

        });
        element.exceptionName = exceptionName;

        let exceptionCount: string = '';
        element.exceptionResources.forEach((data: any) => {
          exceptionCount = exceptionCount !== '' ? exceptionCount + '\n' + data.exceptionCount : data.exceptionCount;

        });
        element.exceptionCount = exceptionCount;
      });
      this.tableConfig.tableBodyConfig.data = filterData;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    }
  }
  /**
   * fetching all trend data and set to the table config.
   * @param value
   */
  private fetchExecutionTrendDataOnClick(value: number, exceptionName: string, statusColumn: number): void {
    let status: string;
    if (statusColumn === 1) {
      status = ExceptionExecutionColumn.ApplicationDefect;
    } else if (statusColumn === 2) {
      status = ExceptionExecutionColumn.LocatorExceptions;
    } else if (statusColumn === 3) {
      status = ExceptionExecutionColumn.AutomationScriptErrors;
    }
    else if (statusColumn === 4) {
      status = ExceptionExecutionColumn.TimeoutIssue;
    }
    else if (statusColumn === 5) {
      status = ExceptionExecutionColumn.ConnectionIssues;
    }
    else if (statusColumn === 6) {
      status = ExceptionExecutionColumn.Miscellenous;
    }

    this._trendReport.getExceptionExecutionDetail(value, status).subscribe((details: any) => {
      let data: ExceptionTrend = this.exceptionTrend.find((item: ExceptionTrend) => item.executionId === value);
      if (data) {
        details.forEach((element: any) => {
          // element.status = status;
          element.executionId = value;
          element.moduleName = data.moduleName;
        });
      }

      this.isTable = true;
      this.initPropsForConstructorOnClick();
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ExceptionTrend[] = [...details.map((executionDuration: ExceptionTrend) => {
        return executionDuration;
      })];
      this.tableConfig.tableBodyConfig.data = filterData;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    });

    //
    //   this.loaderService.displayLoader(false);
    //   this.exceptionTrend = details;
    // });

    // this.isTable = true;

    // this.initPropsForConstructorOnClick();
    // if (this.exceptionTrend && this.exceptionTrend.length && this.isTable) {
    //   const config: TableConfiguration = { ...this.tableConfig };
    //   const filterData: ExceptionTrend[] =
    //     [...this.exceptionTrend.map((executionDuration: ExceptionTrend) => {
    //       return executionDuration;
    //     })];
    //   console.log('filter', filterData);

    //   this.tableConfig.tableBodyConfig.data = filterData;
    //   this.tableConfig = { ...config };
    //   /** When invoke this method is update the dom */
    //   this.cdr.detectChanges();
    // }
  }


}

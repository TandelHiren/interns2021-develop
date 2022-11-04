import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
// -------------------------------------------------------------- //
import { LoaderService } from '../../core';
import { HeaderConfiguration, TableConfiguration } from '../../shared';
import { TrendReportService } from '../service/trend-report.service';
import {
  ApplicationSummaryReport,
  ApplicationSummaryStatus,
  ApplicationSummary
} from './application-summary-report.model';
import { TrendReportFilterService } from '../service/trend-report-filter.service';
import { ProjectCard, ApplicationModule } from 'src/app/dashboard/dashboard.model';

declare let google: any;
declare let $: any;
/**
 *  application summary report
 */
@Component({
  selector: 'one-automation-application-summary-report',
  templateUrl: './application-summary-report.component.html',
  styleUrls: ['./application-summary-report.component.scss']
})
export class ApplicationSummaryReportComponent implements OnInit, OnDestroy {

  /**
   * Host binding of exception trend component
   */
  @HostBinding('class') classes = 'd-flex flex-column h-100 overflow-hidden';
  /** Module list of application summary report component */
  @Input() public moduleList = [];
  /** applicationSummaryFilter */
  public applicationSummaryFilter: FormGroup;
  /**
   * View child of application summary report component
   */
  @ViewChild('chart') public chart: ElementRef;
  /**
   * enum for application summary status.
   */
  public ApplicationSummaryStatus: ApplicationSummaryStatus;
  /**
   * store application summary report response.
   */
  public ApplicationSummaryData: ApplicationSummaryReport[];
  /**
   * to-do table
   */
  public isTable: boolean;
  /** to-do */
  public listner$: Subscription;
  /**
   * the table configuration.
   */
  public tableConfig: TableConfiguration;
  /**
   * applicationSummaryReport
   */
  public applicationSummaryReport: ApplicationSummaryReport[] = [];
  /**
   * applicationChartColumnData
   */
  public applicationChartColumnData: any[];
  /** applicationId */
  public applicationId: any;
  /** Filter date of application summary report component */
  public filterDate: string;
  /**
   * fromDate
   */
  public fromDate: Date;
  /**
   * Get module id of application summary report component
   */
  public toDate: Date;

  /**
   * Get module id of application summary report component
   */
  public getModuleId: any
  /**
   * Dropdown list of application summary report component
   */
  public dropdownList = [];
  /**
   * Selected items of application summary report component
   */
  public selectedItems = [];
  /**
   * Dropdown settings of application summary report component
   */
  public dropdownSettings = {};
  /**
   * Show filter of application summary report component
   */
  public ShowFilter = false;
  /**
   * Limit selection of application summary report component
   */
  public limitSelection = false;
  /**
   * Selected module list of application summary report component
   */
  public selectedModuleList = [];

  constructor(
    private _trendReport: TrendReportService,
    private trendReportFilter: TrendReportFilterService,
    // private cdr: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,

  ) {
    this.initProps();
    this.applicationChartColumnData = [

      {
        columnType: 'string',
        columnValue: ApplicationSummary.ModuleName
      },
      // {
      //   columnType: 'number',
      //   columnValue: ApplicationSummaryStatus.ExecutionId
      // },
      {
        columnType: 'number',
        columnValue: ApplicationSummary.Passed
      },
      {
        columnType: 'number',
        columnValue: ApplicationSummary.Failed
      },
      {
        columnType: 'number',
        columnValue: ApplicationSummary.Skipped
      }
    ];
    // this.initPropsForConstructor();
    this.isTable = false;
  }
  /**
   * lifecycle hook
   */
  public ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.applicationId = +paramMap.get('applicationId');
      this.getApplicationSummaryData(this.applicationId);
    });
    //  this.getDropDownList();
    this.getModuleList();

  }


  /**
   * to-do
   */
  public ngOnDestroy(): void {
    if (this.listner$) {
      // this.listner$.unsubscribe();
    }
  }
  /**
   * `
   * @author Hiren Tandel
   * @description get the application summary data.
   */
  public getApplicationSummaryData(applicationId: number): void {
    this.loaderService.displayLoader(true);
    const applicationData: any = {
      applicationId: this.applicationId,
      moduleIds: [],
      fromDate: '',
      toDate: ''

    }
    this.trendReportFilter.getApplicationSummaryData(applicationData)
      .subscribe((response: any[]) => {
        //response = [];
        if (response.length > 0) {
          this.loaderService.displayLoader(false);
          this.ApplicationSummaryData = response;
          this.applicationSummaryReport = response;
          this.drawChart(this.applicationSummaryReport);
          this.getApplicationSummaryList();
        } else {
          //  this.toaster.error('Chart data not found', 'Application Summary Report', { closeButton: true });
        }
      });
  }
  /**
   * `
   * @author Hiren Tandel
   * @description Load the Visualization API and the corechart package.
   * Set a callback to run when the Google Visualization API is loaded.
   * @param data to-do
   */
  public drawChart(data: any): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.CreateDrawChart(data);
    });
  }
  /**
   * `
   * @author Hiren Tandel
   * @description Callback that creates and populates a data table,
   *  instantiates the stacked chart, passes in the data and draw it.
   * @param data to-do
   */
  public CreateDrawChart(chartData: any): void {

    const data: any = chartData.length > 10 ? chartData.slice(0, 10) : chartData;
    //  Create the data table.
    const dataTable: any = new google.visualization.DataTable();
    this.applicationChartColumnData.forEach((config: any) => {
      dataTable.addColumn(config.columnType, config.columnValue);
    });

    for (const row of data) {
      dataTable.addRow([row.moduleName, row.passed, row.failed, row.skipped]);
      // const applicationSummaryRowData: any = [];
      // for (const col of this.applicationChartColumnData) {
      //   applicationSummaryRowData.push(row[col.columnValue]);
      // }
      // dataTable.addRow([...applicationSummaryRowData]);
    }
    // Set chart options
    const options: any = {
      legend:'none',
     // legend: { position: 'top', alignment: 'end'},
      isStacked: true,
      pointShape: 'square',
      backgroundColor: 'transparent',
      bar: {
        groupWidth: '20%',
      },
      series: [
        // { color: '#ec407a' },
        // { color: '#7c4dff' },
        // { color: '#4dd0e1' }
        { color: '#07bdff' },// Pass #d95f02 
        { color: '#fa2e57' }, // Fail #ff5a5d
        { color: '#6c757d' }  // Skip #7570b3
      ],
      hAxis: {
        format: '0',
        title: ' Modules',
        textStyle: {
          fontSize: 12,
          paddingRight: '100',
          marginRight: '100' // or the number you want
        },
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },
        fontStyle: 'Poppins'
      },
      vAxis: {
        format: '0',
        vAxis: { minValue: 0 },
        title: 'Test Cases',
        titleTextStyle: {
          bold: true,
          fontName: 'Poppins'
        },
        // viewWindowMode: 'explicit', viewWindow: { min: 0 },
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
   * `
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
      let getExecutionId: ApplicationSummaryReport = this.applicationSummaryReport.find
        ((item: ApplicationSummaryReport) => item.moduleName === topping);
      this.clickTable(getExecutionId.executionId, statusColumn);
    }
  }
  /**
   * `
   * @author Hiren Tandel
   * @description when user click on chart
   * @param executionId 
   * @param statusColumn 
   */
  public clickTable(executionId: number, statusColumn: number): void {
    let status: string;
    if (statusColumn === 1) {
      status = ApplicationSummary.Passed;
    } else if (statusColumn === 2) {
      status = ApplicationSummary.Failed;
    } else if (statusColumn === 3) {
      status = ApplicationSummary.Skipped;
    }
    this._trendReport.getApplicationSummuryDetails(executionId, status.toUpperCase()).subscribe((response: any) => {
      let data: ApplicationSummaryReport =
        this.applicationSummaryReport.find((item: ApplicationSummaryReport) => item.executionId === executionId);
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
      const filterData: ApplicationSummaryReport[] =
        [...response.map((applicationSummary: ApplicationSummaryReport) => {
          return applicationSummary;
        })];
      filterData.forEach((element: any) => {
        let stepdetail: string = '';
        element.stepdetail.forEach((data: string) => {
          stepdetail = stepdetail !== '' ? stepdetail + '\n' + data : data;

        });
        element.stepdetail = stepdetail;
      });
      this.tableConfig.tableBodyConfig.data = response;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    });
  }
  /**
   * `
   * @author Hiren Tandel
   * @description Gets module list
   */
  public getModuleList(): void {
    let moduleNames = [];
    this.trendReportFilter.getModuleById(this.applicationId).subscribe((response: any) => {
      this.getModuleId = response;
      this.getModuleId.forEach((element: any) => {
        moduleNames.push(element.moduleName);
      });
      this.moduleList = moduleNames;
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter,
      limitSelection: 10
    };
  }
  /**
   * `
   * @author Hiren Tandel
   * @description fetch module list 
   */
  // public getDropDownList(): void {
  //   debugger;
  //   let moduleNameList: string[] = [];
  //   this.trendReportFilter.getModuleById(this.applicationId).subscribe((response:any[]) => {
  //     const dropDown: any[] = response;
  //     debugger;
  //     // dropDown.moduleId.forEach((element: ApplicationModule) => {
  //     //   moduleNameList.push(element.moduleName);
  //     // });
  //     // this.dropdownList = moduleNameList;
  //   })
  // this.dropdownSettings = {
  //   singleSelection: false,
  //   idField: 'item_id',
  //   textField: 'item_text',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 1,
  //   allowSearchFilter: this.ShowFilter,
  //   limitSelection: 10
  // };
  // }
  /**
   * `
   * @author Hiren Tandel
   * @description Determines whether item select on
   * @param item  select module name
   */
  public onItemSelect(item: string): void {
    this.selectedModuleList.push(item);
  }
  /**
   * `
   * @author Hiren Tandel 
   * @description Determines whether item de select on
   * @param items deselect module name
   */
  public onItemDeSelect(items: string): void {
    let deSelectedModuleList: string[];
    deSelectedModuleList = this.selectedModuleList.filter((rc: string) => rc !== items);
    this.selectedModuleList = [];
    this.selectedModuleList = deSelectedModuleList;

  }
  /**
   * `
   * @author Hiren Tandel
   * @description Determines whether submit filter on
   */
  public onSubmitFilter(): void {
    let filterRangeDate: [] = this.applicationSummaryFilter.controls.filterRangeDate.value;
    let transformDate = [];
    let fromDate: string;
    let toDate: string;
    let data: any = this.applicationSummaryFilter.controls.moduleId.value;
    let moduleIdList: any[] = [];
    if (data !== '') {
      data.forEach((res: string) => {
        let selectedModule: ApplicationModule = this.getModuleId.find((element: ApplicationModule) => element.moduleName === res);
        moduleIdList.push(selectedModule.moduleId);
      });
    } else {
      moduleIdList = [];
    }

    if (filterRangeDate !== null) {
      filterRangeDate.forEach((element: any) => {
        transformDate.push(this.datePipe.transform(element, 'yyyy-MM-dd'));
      });
      fromDate = transformDate[0];
      toDate = transformDate[1];
    } else {
      fromDate = '';
      toDate = '';
    }
    const filterDataItem: { [key: string]: string | number[] } = {
      applicationId: this.applicationId,
      moduleIds: moduleIdList,
      fromDate,
      toDate
    }
    this.filterCall(filterDataItem);
  }
  /**
   * `
   * @author Hiren Tandel
   * @description Both Api call common function Filters call
   * @param filterDataItem 
   */
  public filterCall(filterDataItem): void {
    this.loaderService.displayLoader(true);
    this.trendReportFilter.getApplicationSummaryData(filterDataItem).subscribe((response) => {
      this.loaderService.displayLoader(false);
      this.ApplicationSummaryData = response;
      this.applicationSummaryReport = response;
      this.drawChart(this.applicationSummaryReport);
      this.getApplicationSummaryList();
    })
  }
  /**
   * `
   * @author Hiren Tandel
   * @description Determines whether reset filter on
   */
  public onResetFilter(): void {
    this.applicationSummaryFilter.reset();
    const filterDataItem: { [key: string]: string | number[] } = {
      applicationId: this.applicationId,
      moduleIds: [],
      fromDate: '',
      toDate: ''
    }
    this.filterCall(filterDataItem);
  }
  /**
   * `
   * @author Hiren Tandel
   * @description getting the application summary list
   * @param topping
   */
  private getApplicationSummaryList(): void {
    this.isTable = true;
    this.initPropsForConstructor('Scenario steps', 'scenarioSteps');
    this.fetchApplicationSummary();
  }
  /**
   * `
   * @author Hiren Tandel.
   * @description initializes the properties for constructor.
   */
  private initPropsForConstructor(headerTitle: string, headerId: string): void {
    this.tableConfig = {
      tableConfig: {},
      tableHeaderConfig: {
        header: this.getTableHeader(headerTitle, headerId)
      },
      tableBodyConfig: {
        data: []
      }
    };
  }
  /**
   * `
   * @author Hiren Tandel
   * @description returns the header for table header.
   * @param headerTitleValue string
   * @param headerIdValue string
   * @returns table header 
   */
  private getTableHeader(headerTitleValue: string, headerIdValue: string): HeaderConfiguration[] {
    return [
      { headerTitle: 'Execution Id', headerClass: 'width-12', headerId: 'executionId' },
      { headerTitle: 'Module Name', headerClass: 'width-12', headerId: 'moduleName' },
      { headerTitle: headerTitleValue, headerClass: 'width-24 white-space-pre-line', headerId: headerIdValue },
      // { headerTitle: 'Scenario Steps', headerClass: 'width-24', headerId: 'scenarioSteps' },
      { headerTitle: 'Status', headerClass: 'width-8 white-space-pre-line', headerId: 'status' }
    ];
  }
  /**
   * `
   * @author Hiren Tandel 
   * @description fetching all trend data and set to the table config.
   */
  private fetchApplicationSummary(): void {
    this.isTable = true;
    this.initPropsForConstructor('Scenario Name', 'scenarioName');
    if (this.ApplicationSummaryData && this.ApplicationSummaryData.length && this.isTable) {
      const config: TableConfiguration = { ...this.tableConfig };
      const filterData: ApplicationSummaryReport[] =
        [...this.ApplicationSummaryData.map((executionDuration: ApplicationSummaryReport) => {
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

  /**
   * `
   * @author Hiren Tandel
   * @description initializes the instance properties.
   */
  private initProps(): void {
    this.applicationSummaryFilter = this.fb.group({
      // formdate: [''],
      // todate: [''],
      filterRangeDate: [],
      moduleId: ['']
    });
  }

}



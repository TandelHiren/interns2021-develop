import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../core';
/** -------------------------------------------------------------- */
import { HeaderConfiguration, TableConfiguration } from '../../shared';
import { TrendReportService } from '../service/trend-report.service';
import { ModuleSummaryReport, ModuleSummaryReportcolumnData } from './module-summary-report.model';
import { ToastrService } from 'ngx-toastr';

declare let $: any;
/**
 * module summary report
 */
@Component({
  selector: 'one-automation-module-summary-report',
  templateUrl: './module-summary-report.component.html',
  styleUrls: ['./module-summary-report.component.scss'],
})
export class ModuleSummaryReportComponent implements OnInit {
  /** chart_div  */
  @ViewChild('chart') public chart: ElementRef;
  /**
   * store module summary report data
   */
  public moduleSummarydata: ModuleSummaryReport[];
  /**
   * table to-do
   */
  public isTable: boolean;
  /**
   * applicationId
   */
  public applicationId: number;
  /**
   * listner to-do
   */
  public listner$: Subscription;
  /**
   * the table configuration.
   */
  public tableConfig: TableConfiguration;
  /**
   * moduleSummaryData
   */
  public moduleSummaryData: ModuleSummaryReport[] = [];
  /** to-do */
  public moduleSummaryChartColumnData: any[];
  /**
   * moduleId
   */
  public moduleId: number;
  constructor(
    private _trendReport: TrendReportService,
    private cdr: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private toaster: ToastrService,
  ) {
    this.moduleSummaryChartColumnData = [
      {
        columnType: 'string',
        columnValue: ModuleSummaryReportcolumnData.ScenarioName,
      },
      {
        columnType: 'number',
        columnValue: ModuleSummaryReportcolumnData.Noofpassedsteps,
      },
      {
        columnType: 'number',
        columnValue: ModuleSummaryReportcolumnData.Nooffailedsteps,
      },
      {
        columnType: 'number',
        columnValue: ModuleSummaryReportcolumnData.Noofskipedsteps,
      },
    ];
    // this.initPropsForConstructor();
    this.isTable = false;

    this.applicationId = null;
  }
  /**
   * life cycle hook
   */
  public ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.applicationId = +paramMap.get('applicationId');
      this.getApplicationById(this.applicationId);
    });
  }
  /**
   * getApplicationById
   * @param applicationId
   */
  public getApplicationById(applicationId: number) {
    this._trendReport.getApplicationById(applicationId).subscribe((response: any) => {
      //  console.log('duration response--->', response);
      if (response.modules.length >= 1) {
        this.moduleId = response.modules[response.modules.length - 1].moduleId;
        this.getModuleSummaryData(this.moduleId);
      }
    });

  }
  /**
   * @author Hiren Tandel
   * @description getting the module summary data
   */
  public getModuleSummaryData(moduleId: number): void {
    this.loaderService.displayLoader(true);
    this._trendReport.getModuleSummaryReport(moduleId)
      .subscribe((data: any) => {
        //  data = [];
        if (data.length > 0) {
          //  console.log('module----->', data);
          this.loaderService.displayLoader(false);
          this.moduleSummarydata = data;
          this.moduleSummaryData = data;
          this.BuildPieChart('tooltip_action');
        } else {
          this.toaster.error('Chart data not found', 'Module Summary Report', { closeButton: true });
        }
      });
  }
  /**
   * @author Hiren Tandel
   * @description chart
   * @param elementId
   */
  public BuildPieChart(elementId: string): void {
    // tslint:disable-next-line:typedef
    const chartFunc: any = () => {
      return new google.visualization.PieChart(document.querySelector(elementId));
    };
    this.drawChart(this.moduleSummaryData, 'bar');
  }
  /**
   * @author Hiren Tandel
   * @description Load the Visualization API and the corechart package.
   * Set a callback to run when the Google Visualization API is loaded.
   * @param data to-do
   * @param chartType
   */
  public drawChart(data: any, chartType: string): void {
    /** Load the Visualization API and the piechart package. */
    google.charts.load('current', { packages: ['corechart', chartType] });
    /** Set a callback to run when the Google Visualization API is loaded. */
    google.charts.setOnLoadCallback(() => {
      this.CreateDrawChart(data);
    });

  }
  /**
   * @author Hiren Tandel
   * @description Callback that creates and populates a data table,
   *  instantiates the stacked chart, passes in the data and draw it.
   * @param chartData show last five execution show
   */
  public CreateDrawChart(chartData: any): void {
    const data: any = chartData.length > 5 ? chartData.slice(0, 5) : chartData;
    setTimeout(() => {
      // Define the chart to be drawn.
      const dataTable: any = new google.visualization.DataTable();
      this.moduleSummaryChartColumnData.forEach((config: any) => {
        dataTable.addColumn(config.columnType, config.columnValue);
      });
      for (const row of data) {
        dataTable.addRow([row.scenarioName, row.noOfPassedSteps, row.noOfFailedSteps, row.noOfSkipedSteps]);
      }
      // Set chart options
      const options: any = {
        viewWindowMode: 'explicit', viewWindow: { min: 0 },
        legend: { position: 'top', alignment: 'end' },
        isStacked: true,
        backgroundColor: 'transparent',
        series: [
          { color: '#ec407a' },
          { color: '#7c4dff' },
          { color: '#4dd0e1' },
        ],
        hAxis: {
          title: 'No of execution',
          titleTextStyle: {
            bold: true,
            fontName: 'Poppins',
          },
          //  minValue: 0,
          fontStyle: 'Poppins',
        },
        vAxis: {
          title: 'No of test cases',
          titleTextStyle: {
            bold: true,
            fontName: 'Poppins',
          },
          fontStyle: 'Poppins',
        },
      };
      // Instantiate and draw our chart, passing in some options.
      const chart: any = new google.visualization.ColumnChart(this.chart.nativeElement);
      // Every time the table fires the "select" event, it should call selectHandler() function.
      this.listner$ = google.visualization.events.addListener(chart, 'select', () => {
        this.selectHandler(chart, dataTable);
      });
      chart.draw(dataTable, options);
      // google chart responsive.
      $(window).resize(
        () => {
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
  public selectHandler(chart: any, dataTable: any) {
    const selectedItem: any = chart.getSelection()[0];
    if (selectedItem) {
      const statusColumn: number = selectedItem.column;
      const topping: any = dataTable.getValue(selectedItem.row, 0);
      this.getExecutionList(topping, statusColumn);
    }
  }
  /**
   * @author Hiren Tandel
   * @description getting the execution list
   * @param topping
   */
  private getExecutionList(topping: string, statusColumn: number): void {

    // this.initPropsForConstructor();
    this.fetchExecutionTrendData(topping, statusColumn);
  }
  /**
   * @author Hiren Tandel.
   * @description initializes the properties for constructor.
   */
  private initPropsForConstructor(headerStepTitle: string, headerStepId: string): void {
    this.isTable = true;
    this.tableConfig = {
      tableConfig: {

      },
      tableHeaderConfig: {
        header: this.getTableHeader(headerStepTitle, headerStepId),
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
  private getTableHeader(headerStepTitle: string, headerStepId: string): HeaderConfiguration[] {
    return [
      { headerTitle: 'Scenario Name', headerId: 'scenarioName' },
      { headerTitle: headerStepTitle, headerClass: 'white-space-pre-line', headerId: headerStepId },
      // { headerTitle: 'Failed Steps List', headerClass: 'width-24', headerId: 'failedStepsList' },
      // { headerTitle: 'Skiped Steps List', headerClass: 'width-24', headerId: 'skipedStepsList' },
    ];
  }
  /**
   * @author Hiren Tandel
   * @description feching the execution summary data and set to the table.
   * @param scenarioName
   * @param statusColumn
   */
  private fetchExecutionTrendData(scenarioName: string, statusColumn: number): void {
    if (this.moduleSummarydata && this.moduleSummarydata.length) {
      const filterData: ModuleSummaryReport[] = [...this.moduleSummarydata.map((executionDuration: ModuleSummaryReport) => {
        return executionDuration;
      })];
      let status: string;
      const setExecutionData: any = [];
      if (statusColumn === 1) {
        this.initPropsForConstructor('Passed Steps List', 'steps');
        this.getTableHeader('Passed Steps List', 'passedStepsList');
        status = ModuleSummaryReportcolumnData.Noofpassedsteps;
        setExecutionData.push(filterData.find((rc: ModuleSummaryReport) => rc.noOfPassedSteps > 0 && rc.scenarioName === scenarioName));
        setExecutionData.forEach((executionData: any) => {
          if (executionData.passedStepsList) {
            let steps: string = '';
            executionData.passedStepsList.forEach((step: any) => {
              const index: number = executionData.passedStepsList.indexOf(step);
              steps = steps + step + '\n';
            });
            executionData.steps = steps;
            //  console.log(steps);

          }
        });
      } else if (statusColumn === 2) {
        this.initPropsForConstructor('Failed Steps List', 'steps');
        this.getTableHeader('Failed Steps List', 'failedStepsList');
        status = ModuleSummaryReportcolumnData.Nooffailedsteps;
        setExecutionData.push(filterData.find((rc: ModuleSummaryReport) => rc.noOfFailedSteps > 0 && rc.scenarioName === scenarioName));
        setExecutionData.forEach((executionData: any) => {
          if (executionData.failedStepsList) {
            let steps: string = '';
            executionData.failedStepsList.forEach((step: any) => {
              const index: number = executionData.failedStepsList.indexOf(step);
              steps = steps + step + '\n';
            });
            executionData.steps = steps;
            // console.log(steps);

          }
        });
      } else if (statusColumn === 3) {
        this.initPropsForConstructor('Skiped Steps List', 'skipedStepsList');
        this.getTableHeader('Skiped Steps List', 'skipedStepsList');
        status = ModuleSummaryReportcolumnData.Noofskipedsteps;
        setExecutionData.push(filterData.find((rc: ModuleSummaryReport) => rc.noOfSkipedSteps > 0 && rc.scenarioName === scenarioName));
        setExecutionData.forEach((executionData: any) => {
          if (executionData.skipedStepsList) {
            let steps: string = '';
            executionData.skipedStepsList.forEach((step: any) => {
              const index: number = executionData.skipedStepsList.indexOf(step);
              steps = steps + step + '\n';
            });
            executionData.steps = steps;
            //  console.log(steps);

          }
        });
      }

      const config: TableConfiguration = { ...this.tableConfig };
      // setExecutionData.push(filterData.find((rc: ModuleSummaryReport) => rc.scenarioName === scenarioName));
      this.tableConfig.tableBodyConfig.data = setExecutionData;
      this.tableConfig = { ...config };
      /** When invoke this method is update the dom */
      this.cdr.detectChanges();
    }
  }
}

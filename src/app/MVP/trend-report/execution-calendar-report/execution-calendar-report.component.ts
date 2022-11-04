import { DatePipe } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, HostBinding
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
/** -------------------------------------------------------------- */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../core';
import { ProjectCard } from '../../dashboard/dashboard.model';
import { TrendReportService } from '../service/trend-report.service';
import { ExecutionCalender, ExecutionCalenderDetails } from './execution-calendar-report.model';
import { ToastrService } from 'ngx-toastr';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };
/**
 * execution calender component
 */
@Component({
  selector: 'one-automation-execution-calendar-report',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './execution-calendar-report.component.html',
  styleUrls: ['./execution-calendar-report.component.scss']
})
export class ExecutionCalendarReportComponent implements OnInit, AfterViewInit, OnDestroy {
  
  /**
   * Host binding of exception trend component
   */
  @HostBinding('class') classes = 'd-flex flex-column h-100 overflow-hidden';
  /** to-do */
  @ViewChild('calenderRef') public calenderRef: TemplateRef<any>;
  /** to-do */
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  /**
   * calendar month view
   */
  public view: CalendarView = CalendarView.Month;
  /**
   * CalendarView
   */
  public CalendarView: any = CalendarView;
  /**
   * isShow
   */
  public isShowCalenderChart: boolean;
  /**
   * viewDate
   */
  public viewDate: Date = new Date();
  /**
   * refresh
   */
  public refresh: Subject<any> = new Subject();
  /**
   * activeDayIsOpen
   */
  public activeDayIsOpen: boolean = true;
  /**
   * ExecutionCalender
   */
  public executionCalender: ExecutionCalender[] = [];
  /**
   * applicationId
   */
  public applicationId: number;
  /**
   * fromDate
   */
  public fromDate: any;
  /**
   * toDate
   */
  public toDate: any;
  /**
   * response save
   */
  public applicationDataresponse: ProjectCard;
  /**
   * calender details response save
   */
  public calenderDetail: ExecutionCalenderDetails[];
  /**
   * CalendarEvent
   */
  public events: CalendarEvent[] = [];

  /**
   * refreshSubscription
   */
  public refreshSubscription: Subscription;

  constructor(
    private modal: NgbModal,
    private calenderdata: TrendReportService,
    private activateRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService
  ) { }
  /**
   * life cycle hook
   */
  public ngOnInit(): void {

    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        //  this.refreshAll();
        this.cdr.markForCheck();
      });
    }

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
    this.calenderdata.getApplicationById(applicationId).subscribe((response: any) => {
      this.applicationDataresponse = response;
      this.getcalendarData(this.applicationId);
    });
  }
  /**
   * @author Hiren Tandel
   * @description getting the calendar data
   */
  public getcalendarData(applicationId: number): void {
    this.loaderService.displayLoader(true);

    const date: Date = new Date();
    const firstDay: number = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    const lastDay: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const fromDate: string = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), firstDay), 'yyyy-MM-dd');
    const toDate: string = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), lastDay), 'yyyy-MM-dd');
    this.calenderdata.getExecutionCalendar(applicationId, fromDate, toDate).subscribe((data: any) => {
      // data= [];
      // console.log('celender', data);
      if (data.length > 0) {
        this.loaderService.displayLoader(false);
        this.executionCalender = data;
        this.events = [];
        // tslint:disable-next-line:prefer-for-of
        for (const calender of this.executionCalender) {
          this.events.push(
            {
              start: new Date(calender.executionDate),
              title: 'Total Count : ' + calender.executionCount
            }
          );
        }
        this.refresh.next();
        //  console.log('events', this.events);
      } else {
        //   this.toaster.error('Chart data not found', 'Execution Calendar Report', { closeButton: true });
      }
    });
  }
  /**
   * dayClicked
   * @param date
   * @param events
   */
  public dayClicked({ date, events }: {
    /**
     * date
     */
    date: Date;
    /**
     * events
     */
    events: CalendarEvent[]
  }): void {
    this.loaderService.displayLoader(true);
    // console.log('date--------------->', date);

    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.getCalenderDatebyDay(date);
    }

  }
  /**
   * to-do
   * ngAfterViewInit
   */
  public ngAfterViewInit(): void {
    // console.log('calenderRef', this.calenderRef);
  }
  /**
   * eventTimesChanged
   * @param
   */
  public eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //  this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
  /**
   * handleEvent
   * @param action
   * @param event
   */
  public handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }
  /**
   * @author Hiren Tandel
   * @description getting the calender details by date
   */
  public getCalenderDatebyDay(date: any) {
    const createDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.calenderdata.getExecutionCalendarDetails(this.applicationDataresponse.applicationId, createDate)
      .subscribe((data: any) => {
        this.loaderService.displayLoader(false);
        this.calenderDetail = data;
        if (this.calenderDetail.length >= 1) {
          this.isShowCalenderChart = true;
        } else {
          //   this.toaster.error('Chart data not found', 'Execution Calendar Report', { closeButton: true });
        }
      });
  }
  /**
   * @author Hiren Tandel
   * @description refreshS ubscription  is unsubscribe
   */
  public ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }
}

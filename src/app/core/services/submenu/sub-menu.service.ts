import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// tslint:disable-next-line: completed-docs
@Injectable()
export class SubMenuService {
  /** Set application id$ of sub menu service */
  public setApplicationId$: Observable<number>;
  
  /** Set application id of sub menu service */
  private setApplicationId: Subject<number>;


  constructor() {
    this.setApplicationId = new Subject();
    this.setApplicationId$ = this.setApplicationId.asObservable();
  }

  /**
   * Sets application
   * @param value 
   */
  public setApplication(value): void {
    this.setApplicationId.next(value);
  }
}

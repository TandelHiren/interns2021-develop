import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'oidc-client';

@Injectable()
export class TopbarService {

  /**
   * Determines whether sidebar collapsed or not.
   */
  public isCollapsed: BehaviorSubject<boolean>;
  /** profileChange then emit */
  public profileChange: BehaviorSubject<User['profile']>;

  constructor() {
    this.isCollapsed = new BehaviorSubject<boolean>(null);
    this.profileChange = new BehaviorSubject(null);
  }

  /**
   * Sets dashboard collapsed
   * @param flagCollapsed 
   */
  public setDashboardCollapsed(flagCollapsed: boolean): void {
    this.isCollapsed.next(flagCollapsed);
  }
  /**
   * Sets profile change
   * @param profileChangeValue 
   */
  public setProfileChange(profileChangeValue: User['profile']): void {
    this.profileChange.next(profileChangeValue);
  }
}

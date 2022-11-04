import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
// ---------------------------------- //
import { TopbarPresenter } from '../topbar-presenter/topbar.presenter';
import { User } from 'oidc-client';
import { FormGroup } from '@angular/forms';
import { TopbarService } from 'src/app/core/services/topbar/topbar.service';
import { ToggleAnimation, DropdownAnimation } from '../dashboard.animation';


@Component({
  selector: 'one-automation-topbar-ui',
  templateUrl: './topbar.presentation.html',
  viewProviders: [TopbarPresenter],
  animations: [ToggleAnimation.bodyExpansion, ToggleAnimation.indicatorRotate, DropdownAnimation.fadeInDown],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarPresentationComponent implements OnInit {

  /** userData */
  @Input() public set userData(user: any) {
    if(user){
    this._userData = user;
    this.userName = user ;
    }
  }
  public get userData(): any {
    return this._userData;
  }
  /** Property use to append class based on dropdown display type. */
  public userProfileState: boolean;
  /** Property use to manage dropdown state */
  public dropdownState: boolean;
  /** User name of topbar component */
  public userName: string;

  /** Input  of topbar component */
  private _userData: any;


  constructor(
    private topbarService: TopbarService,
    private topbarPresenter: TopbarPresenter,
  ) {
    this.dropdownState = false;
    this.userProfileState = false;
  }

  /**
   * on init
   */
  public ngOnInit(): void {
    this.topbarService.profileChange.subscribe((profileData: User['profile']) => {
      if (profileData != null) {
        this.userName = profileData.name;
      }
    });
    this.topbarPresenter.changeScreenSize();
  }

  /**
   * Users profile btn to open dropdown
   */
  public userProfileBtn(): void {
    this.dropdownState = false;
    this.userProfileState = !this.userProfileState;
  }
  /**
   * Toggles side bar flag Is collapsed
   */
  public toggleSideBar(): void {
    this.topbarPresenter.toggleSideBar();

  }

  /**
   * called when click on logout option
   */
  public logout(): void {
    this.topbarPresenter.logout();
  }

  /**
   * Tracks by
   * @param index 
   * @param item 
   * @returns by 
   */
  public trackBy(index: number): number {
    return index;
  }

}
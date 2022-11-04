import { Injectable, ElementRef } from '@angular/core';
import { TopbarService } from 'src/app/core/services/topbar/topbar.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class TopbarPresenter {
 /** Property use to store sidebar collapsed state. */
 public isSideBarCollapsed: boolean;
 /** isScreenForDesktop */
 private isScreenForDesktop: boolean;
 /** Overlay ref of topbar component to create dropdown for profile options */
//  private overlayRef: OverlayRef;
 constructor(
     private topbarService: TopbarService,
     private authService: AuthService,
    //  private breakpointObserver: BreakpointObserver,
    //  private formBuilder: FormBuilder
 ) {
     this.isSideBarCollapsed = false;
     this.topbarService.setDashboardCollapsed(this.isSideBarCollapsed)
 }

 /**
  * Builds form
  * @returns form 
  */
//  public buildForm(): FormGroup {
//      return this.formBuilder.group({
//          selectedLanguage: ['en-us']
//      });
//  };

 /**
  * Change screen size
  */
 public changeScreenSize(): void {
    //  this.breakpointObserver
    //      .observe(['(max-width: 991px)'])
    //      .subscribe((state: BreakpointState) => {
    //          if (state.matches) {
    //              this.isScreenForDesktop = false;
    //              this.isSideBarCollapsed = false;
    //              this.topbarService.setDashboardCollapsed(this.isSideBarCollapsed);
    //          } else {
    //              this.isScreenForDesktop = true;
    //              this.isSideBarCollapsed = false;
    //              this.topbarService.setDashboardCollapsed(this.isSideBarCollapsed);
    //          }
    //      });
 }


 /**
  * Toggles side bar flag Is collapsed
  */
 public toggleSideBar(): void {
     if (this.isScreenForDesktop) {
         if (this.isSideBarCollapsed) {
             this.isSideBarCollapsed = false;
         } else {
             this.isSideBarCollapsed = true;
         }
         this.topbarService.setDashboardCollapsed(this.isSideBarCollapsed);
     }
 }

 /**
  * called when click on logout option
  */
 public logout(): void {
     this.authService.logout();
 }
 
}
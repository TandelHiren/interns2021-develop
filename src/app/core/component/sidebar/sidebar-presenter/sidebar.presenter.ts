import { AllPermissions } from './../../../auth-policy-permission/permission';
import { AuthService } from './../../../services/auth/auth.service';
import { Injectable, ComponentFactoryResolver, ElementRef, ComponentRef, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Menu, Permisison, SubMenu } from 'src/app/core/models/core.model';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SidebarPresenter {
  /** Overlay ref for creating helpdesk and submenu */
  // public overlayRef: OverlayRef;
  private applicationSubMenus: Subject<SubMenu[]>;
  public applicationSubMenus$: Observable<SubMenu[]>;
   /** enum of permission */
   public permission: typeof AllPermissions = AllPermissions;


  constructor(
    // private overlay: Overlay,
    private resolver: ComponentFactoryResolver,
    private activetedRoute: ActivatedRoute,
    private authService: AuthService,
    // private authPolicy :AuthPolicyService
  ) {
    this.applicationSubMenus = new Subject();
    this.applicationSubMenus$ = this.applicationSubMenus.asObservable();
  }
  /**
   * Creates submenu over lay when menu is Collapsed.
   * @param menu to extract submenu from menu object
   * @param index to get the position of container
   */
  public createSubmenuOverLay(menu: Menu, elementRef: ElementRef, isCollapse: boolean): void {
    // const overlayConfigSubmenu: OverlayConfig = new OverlayConfig();
    // overlayConfigSubmenu.hasBackdrop = true;
    // overlayConfigSubmenu.backdropClass = '';
    // overlayConfigSubmenu.positionStrategy = this.overlay.position().flexibleConnectedTo(elementRef).withPositions([
    //   {
    //     originX: 'start',
    //     originY: 'top',
    //     overlayX: 'end',
    //     overlayY: 'top',
    //     offsetX: 70,
    //     offsetY: 15
    //   }
    // ]);
    // this.overlayRef = this.overlay.create(overlayConfigSubmenu);
    // const portal: ComponentPortal<SubmenuComponent>
    //   = new ComponentPortal<SubmenuComponent>(SubmenuComponent);
    // const componentRef: ComponentRef<SubmenuComponent> = this.overlayRef.attach(portal);
    // (componentRef.instance as SubmenuComponent).subMenuData = menu.subMenus;
    // (componentRef.instance as SubmenuComponent).toggleState = isCollapse;
    // (componentRef.instance as SubmenuComponent).closeSideMenuPopup.subscribe((event: boolean) => {
    //   if (event) {
    //     this.overlayRef.detach();
    //   }
    // })
    // this.overlayRef.backdropClick().subscribe(() => {
    //   this.overlayRef.detach();
    // });
  }


  /**
* Creates expanded submenu when isCollapsed is false
*/
  public createExpandedSubmenu(entryArray: ViewContainerRef[], menuData: Menu, index: number, isCollapse: boolean): void {
    entryArray.forEach((singleEntry: ViewContainerRef) => {
      singleEntry.clear();
    });
    // if (menuData.isOpen && menuData.subMenus.length > 0 && menuData.name !== 'Application') {
    //   const factory: ComponentFactory<SubmenuComponent> = this.resolver.resolveComponentFactory(SubmenuComponent);
    //   let componentRef: ComponentRef<SubmenuComponent> = entryArray[index].createComponent(factory);
    //   (componentRef.instance as SubmenuComponent).subMenuData = menuData.subMenus;
    //   (componentRef.instance as SubmenuComponent).toggleState = isCollapse;
    // } else if (menuData.subMenus.length > 0 && menuData.name === 'Application') {
    //   const factory: ComponentFactory<SubmenuComponent> = this.resolver.resolveComponentFactory(SubmenuComponent);
    //   const componentRef: ComponentRef<SubmenuComponent> = entryArray[index].createComponent(factory);
    //   (componentRef.instance as SubmenuComponent).subMenuData = menuData.subMenus;
    //   (componentRef.instance as SubmenuComponent).toggleState = isCollapse;
    // }

  }


  /**
   * Removes expanded submenu when isCollapsed is true
   */
  public removeExpandedSubmenu(entryArray: ViewContainerRef[]): void {
    entryArray.forEach((singleEntry: ViewContainerRef) => {
      singleEntry.clear();
    });
  }

  /**
   * setSubMenuForApplication
   * @param window
   */
  public setSubMenuForApplication(url: string): void {

    // const appDetailUrl: string = `${MenuListEnum.Application}/${MenuListEnum.Detail}/`;
    // let routeUrl: string = MenuListEnum.Application + '/' + MenuListEnum.Detail;
    // const applicationUrlIndex: number = url.indexOf(routeUrl);
    // if (applicationUrlIndex < 0) {
    //   this.applicationSubMenus.next([]);
    //   return;
    // }
    // let applicationUrlString: string = url.substring(applicationUrlIndex);
    // applicationUrlString = applicationUrlString.replace(appDetailUrl, '');

    // let id: string = '';
    // const afterSlaceIdIndex: number = applicationUrlString.indexOf('/');
    // if (afterSlaceIdIndex < 0) {
    //   id = applicationUrlString;
    // } else {
    //   id = applicationUrlString.substring(0, afterSlaceIdIndex);
    // }
    // let appLink: string = `${MenuListEnum.Application}/${MenuListEnum.Detail}/${id}/`;
    // let subMenu: SubMenu[] = this.getApplicationSubmenu(appLink);
    // if ((this.authPolicy.hasPermission(this.permission.SECURITY_SCAN_CRUD) || this.authPolicy.hasPermission(this.permission.SECURITY_SCAN_VIEW_ONLY))) {
    //   this.applicationSubMenus.next(subMenu);
    // } else {
    //   const filterSubMenu = subMenu.filter(item => item.index !== 5);
    //   this.applicationSubMenus.next(filterSubMenu);
    // }
  }

  /**
   * getApplicationSubmenu
   * @param appLink
   */
  public getApplicationSubmenu(appLink: string): SubMenu[] {
    const subMenu: SubMenu[] = [
      {
        index: 0,
        name: 'Overview',
        link: `${appLink}overview`,
        icon: 'icon-submenu icon-overview',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager]
      },
      {
        index: 1,
        name: 'Screen',
        link: `${appLink}screen`,
        icon: 'icon-submenu icon-screen',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      },
      {
        index: 2,
        name: 'Test Case',
        link: `${appLink}test-case`,
        icon: 'icon-submenu icon-test-plan',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      },
      {
        index: 3,
        name: 'Test Suite',
        link: `${appLink}test-suite`,
        icon: 'icon-submenu icon-test-suite',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      },
      {
        index: 4,
        name: 'Execution',
        link: `${appLink}execution`,
        icon: 'icon-submenu icon-execution-history',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      },
      {
        index: 5,
        name: 'Security Scan',
        link: `${appLink}scan`,
        icon: 'icon-submenu icon-security-scan',
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager]
      },
      // {
      //     index: 4,
      //     name: 'Schedular',
      //     link: 'schedular',
      //     icon: 'submenu-icon icon-scheduler',
      //     permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      // },
      // {
      //     index: 5,
      //     name: 'Report',
      //     link: 'report',
      //     icon: 'submenu-icon icon-report',
      //     permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA]
      // }
    ]
    return subMenu;
  }

  /***
   * checkApplicationUrl
   *  @param windowUrl
   */
  // private checkApplicationUrl(routeUrl: string): boolean {
  //   // const appDetailUrl: string = `${MenuListEnum.Application}/${MenuListEnum.Detail}/`;
  //   // return routeUrl.indexOf(appDetailUrl) >= 0;
  // }

}

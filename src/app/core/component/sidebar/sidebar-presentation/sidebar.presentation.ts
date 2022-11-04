import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren, ViewContainerRef
} from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { Menu, SubMenu } from "src/app/core/models/core.model";
import { TopbarService } from "src/app/core/services/topbar/topbar.service";
import { environment } from 'src/environments/environment';
// ---------------------------------- //
import { SidebarPresenter } from "../sidebar-presenter/sidebar.presenter";
import { AllPermissions } from './../../../auth-policy-permission/permission';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: "one-automation-sidebar-ui",
  templateUrl: "./sidebar.presentation.html",
  viewProviders: [SidebarPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarPresentationComponent implements OnInit, AfterViewInit {
  /** This property is use to store Menus data to render on sidebar from particular Apps */
  @Input() public menuData: Menu[];
  /** This property is use to store active menu's blank container */
  @ViewChildren("subMenuRef", { read: ViewContainerRef })
  public entry: QueryList<ViewContainerRef>;
  /** Determines whether current route is dashboard or not. */
  public isDashBoard: boolean;
  /** Determines whether side bar collapsed or not. */
  public isSideBarCollapsed: boolean;
  /** To store blank counters for creating submenus */
  public entryArray: ViewContainerRef[];
  /** store version of application */
  public version: string;
  /** store roles */
  public roles: any;

  /** enum of permission */
  public permission: typeof AllPermissions = AllPermissions;

  constructor(
    private topbarService: TopbarService,
    private sidebarPresenter: SidebarPresenter,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.version = environment.version;
    this.isSideBarCollapsed = false;
  }
  /**
   * To initialize sidebar and listen service to render menu based on collapsed menu click.
   */
  public ngOnInit(): void {
    this.entryArray = [];
    this.addApplicationSubMenu();
    this.getRouteChanges();

    // this.authService.getUserRoles().then((res)=>{
      this.roles = this.authService.getClaimsData().role;
      if (!Array.isArray(this.roles)) {
        let role = [];
        role.push(this.roles);
        this.roles = role;
      }
      if (this.roles && this.roles.length) {
        this.menuData.forEach((menu) => {
          let menuPer = false;
          menu.permisison.forEach(menuPermision => {
            if (!menuPer) {
              if (this.roles && this.roles.filter(role => role === menuPermision).length) {
                menuPer = true;
              }
            }
          });
          menu.isVisibleForUser = menuPer;
          return menu;
        })
      }
      this.cdr.detectChanges();
    // })
  }

  /**
   * after view init
   */
  public ngAfterViewInit(): void {
    this.entryArray = this.entry.toArray();
    this.sidebarPresenter.setSubMenuForApplication(window.location.href);
    this.topbarService.isCollapsed.subscribe((res: boolean) => {
      this.isSideBarCollapsed = res;
      if (this.menuData != null && this.isSideBarCollapsed) {
        let currentOpenedMenu: Menu = this.menuData.find(
          (menu: Menu) => menu.isOpen
        );
        if (currentOpenedMenu) {
          const currentOpenedMenuIndex: number = this.menuData.indexOf(
            currentOpenedMenu
          );
          this.createExpandedSubmenu(currentOpenedMenu, currentOpenedMenuIndex);
        }
      } else {
        this.removeExpandedSubmenu();
      }
    });

    this.entry.changes.subscribe(() => {
      this.entryArray = this.entry.toArray();
      // this.createExpandedSubmenu();
    });
  }
  /**
   * Creates submenu over lay when menu is Collapsed.
   * @param menu to extract submenu from menu object
   * @param index to get the position of container
   */
  public createSubmenuOverLay(menu: Menu, elementRef: ElementRef): void {
    if (menu.subMenus.length > 0) {
      // menu.isOpen = true;
      this.sidebarPresenter.createSubmenuOverLay(
        menu,
        elementRef,
        this.isSideBarCollapsed
      );
    }
  }

  public removeSubmenuOverlay(menu: Menu): void {
    // menu.isOpen = false;
  }

  /**
   * Disables link
   * @param openFlag
   */
  public disableLink(openFlag: boolean): void {
    console.log("click");
  }

  /**
   * Tracks by
   * @param index
   * @param item
   * @returns by
   */
  public trackBy(index: number, item: Menu): number {
    return index;
  }

  /**
   * Creates expanded submenu when isCollapsed is false
   */
  public createExpandedSubmenu(menu: Menu, index: number): void {
    this.menuData.forEach((item: Menu, itemIndex: number) => {
      item.isOpen = false;
      return item;
    });
    menu.isOpen = true;
    if (this.isSideBarCollapsed) {
      this.sidebarPresenter.createExpandedSubmenu(
        this.entryArray,
        menu,
        index,
        this.isSideBarCollapsed
      );
    }
  }

  /**
   * Removes expanded submenu when isCollapsed is true
   */
  public removeExpandedSubmenu(): void {
    this.sidebarPresenter.removeExpandedSubmenu(this.entryArray);
  }

  /**
   * checkApplicationDetailUrl
   */
  private addApplicationSubMenu(): void {
    this.sidebarPresenter.applicationSubMenus$.subscribe(
      (subMenus: SubMenu[]) => {
        let applicationMenu: Menu = this.menuData.find(
          (menu: Menu) => menu.name === "Application"
        );
        if (applicationMenu) {
          const applicationMenuIndex: number = this.menuData.indexOf(
            applicationMenu
          );
          applicationMenu.subMenus = subMenus;
          if (subMenus.length > 0) {
            this.createExpandedSubmenu(applicationMenu, applicationMenuIndex);
          } else {
            applicationMenu.isOpen = false;
            // this.removeExpandedSubmenu();
          }
          this.cdr.detectChanges();
        }
      }
    );
  }

  /**
   * getRouteChanges
   */
  private getRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        // map((event: Event) => this.buildBreadCrumb(this.activatedRoute))
        // filter((event: Event)=> )
        map((event: NavigationEnd) => event.url)
      )
      .subscribe((url: string) => {
        this.sidebarPresenter.setSubMenuForApplication(url);
      });
  }
}

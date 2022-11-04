import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Params, ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'one-automation-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  preserveWhitespaces: false,
  // styles: [`
  //       ul.breadcrumb li+li:before {
  //           padding: 8px;
  //           color: black;
  //           content: "/";
  //       }`
  // ]
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];

  subscription = new Subscription();

 

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit () {
    // subscribe to the NavigationEnd event
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // set breadcrumbs
      this.routeSetter();
    });
    this.routeSetter();

    // this.subscription.unsubscribe();
  }

  routeSetter () {
    const root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    this.cdr.detectChanges();
  }
  /**
   * GET BREADCRUMB DATA FROM ROUTS.
   * @param route route
   * @param url url
   * @param breadcrumbs breadcrumbs
   */
  private getBreadcrumbs (route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        // return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      url += `/${routeURL}`;
      // add breadcrumb
      if (child.snapshot.data[ROUTE_DATA_BREADCRUMB] && child.snapshot.data[ROUTE_DATA_BREADCRUMB] !== '') {
         // && !child.snapshot.params['id']

        const breadcrumb: IBreadcrumb = {
          label: (child.snapshot.params['name'] ? decodeURIComponent(child.snapshot.params['name'])
            : child.snapshot.data[ROUTE_DATA_BREADCRUMB]),
          params: child.snapshot.params,
          url: url
        };

        let pos = breadcrumbs.map(e => { 
          return e.label; 
      }).indexOf(breadcrumb.label); 
        if(pos < 0){
          breadcrumbs.push(breadcrumb);
          
        }else {
          breadcrumbs.splice(pos, 1, breadcrumb);
        }
        breadcrumbs = [...breadcrumbs];
        
      }

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    // we should never get here, but just in case
    return breadcrumbs;
  }


}

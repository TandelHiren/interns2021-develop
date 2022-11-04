import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { AuthPolicyService } from 'auth-policy';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators/map';


@Injectable()
export class AppResolverService implements Resolve<any> {
  constructor(
    // private authPolicy: AuthPolicyService
    ) { }

  resolve(
  ): Observable<any> | Promise<any> | any {

    // let authPolicies = this.authPolicy.loadPolicyData();
    // return forkJoin([authPolicies]).pipe(map(result => {
    //   return {
    //     authPolicies: result[0]
    //   };
    // }));
  }

}

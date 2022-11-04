import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
// import { AuthPolicyService } from 'auth-policy';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();
  public userName$ = new BehaviorSubject<string>('');
  public userRoles$ = new BehaviorSubject<any>([]);
  public userInfo$ = new BehaviorSubject<boolean>(false);

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(map(values => values.every(b => b)));

  private navigateToLoginPage() {
    // TODO: Remember current URL
    this.oauthService.initLoginFlow();
  }

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    // private _authPolicyService: AuthPolicyService
  ) {
    // Useful for debugging:
    // this.oauthService.events.subscribe(event => {
    //   if (event instanceof OAuthErrorEvent) {
    //     console.error(event);
    //   } else {
    //     console.warn(event);
    //   }
    // });

    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      });
    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => { });
    this.oauthService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(e => this.navigateToLoginPage());
    this.oauthService.setupAutomaticSilentRefresh({}, 'access_token');
  }

  public runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
    }

    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured:
    return this.oauthService.loadDiscoveryDocument()
      // 1. HASH LOGIN:
      // Try to log in via hash fragment after redirect back
      // from IdServer from initImplicitFlow:
      .then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.oauthService.loadUserProfile().then(up => {
            // this.userName$.next(up.fullname);
          });
          return Promise.resolve();
        } else {
          this.oauthService.initImplicitFlow();
        }
      })
      .then(() => {
        this.isDoneLoadingSubject$.next(true);
        // Check for the strings 'undefined' and 'null' just to be sure. Our current
        // login(...) should never have this, but in case someone ever calls
        // initImplicitFlow(undefined | null) this could happen.
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          let stateUrl = this.oauthService.state;
          if (stateUrl.startsWith('/') === false) {
            decodeURIComponent(stateUrl);
          }
          //console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
          // this.router.navigateByUrl(stateUrl);
        }
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public login(targetUrl?: string) {
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.userName$.next('');
    localStorage.removeItem('TimeZone');
    localStorage.removeItem('logo');
    // this._authPolicyService.unLoadPolicyData();
    this.oauthService.logOut();
  }
  public refresh() { this.oauthService.silentRefresh(); }
  public hasValidToken() { return this.oauthService.hasValidAccessToken(); }
  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  public accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }

  public async getUserRoles(): Promise<any> {
    const user = await this.oauthService.loadUserProfile().then(up => {
      // return up.role;
    });
    return user;
  }

 /** Get User Claims*/
  public getClaimsData(){
    let jwtData =this.oauthService.getAccessToken().split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    return decodedJwtData;
  }

}

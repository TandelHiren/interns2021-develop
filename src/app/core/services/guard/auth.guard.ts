/**
 * @description the canActivate guard for checking of user Authentication.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
// import { ToastrService } from 'ngx-toastr';
/** -------------------------------------------------------------- */
import { AuthService} from '../auth/auth.service';

/**
 * AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private oauthService: OAuthService,public router: Router) { }

  /**
   * ROUTE GUARD FOR AUTHENTICATION
   */
  /**
   * ROUTE GUARD FOR AUTHENTICATION
   */
  public canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.getUser(route.data.roles);
  }

  /**
   * if user is have the return true either go to start authentication
   */
  public async getUser(userRoles): Promise<boolean> {
    let loggedIn: boolean = false;
    let isAccessible = true;
    const user =  this.authService.getClaimsData().role;
    let roles = this.convertToArray(user);
    let accessibleRoles = userRoles;
    if (roles && roles.length) {
      loggedIn = true;
      if (accessibleRoles && accessibleRoles.length) {
          if (isAccessible) {
            isAccessible = accessibleRoles.filter((accRole) => { return roles.indexOf(accRole) > -1 }).length > 0;
            if (!isAccessible) {
              this.router.navigate(['unauthorised'])
            }
          }
      }

    } else {
      loggedIn = false;
      this.authService.login();
    }
    return loggedIn;
  }

  private convertToArray(data) {
    let roles = []
    if (Array.isArray(data)) {
      roles = data
    } else {
      roles.push(data)
    }
    return roles;
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/internal/operators/filter';
import { RolesPermissions } from '../../models/core.model';
// ------------------------------------------- //
/**
 * AuthCallbackPolicyComponent
 */
@Component({
  selector: 'one-automation-auth-callback',
  templateUrl: './auth-callback.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCallbackComponent implements OnInit {

  public userRoles: any;
  public roles: any;

  constructor(
    private authService: OAuthService,
    private router: Router,
    // private authPolicy: AuthPolicyService
  ) { }
  /**
   * COMPONENT life cycle HOOK
   */
  public ngOnInit(): void {
   this.authService.events.pipe(filter(e => ['user_profile_loaded'].includes(e.type)))
      .subscribe((e) => {
        this.router.navigate(['/'])
        // this.authPolicy.loadPolicyData().subscribe((response: RolesPermissions) => {
        //   this.userRoles = response.roles;
        //   // localStorage.setItem('user-role', this.userRoles[0]);
        //   // localStorage.setItem(this.roles,this.userRoles);
        // });
      });
  }
}

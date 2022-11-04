import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/core.model';
import { menuItem } from '../sidebar/menu-item-list';
import { OAuthService,UserInfo } from 'angular-oauth2-oidc';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'one-automation-master',
  templateUrl: './master.component.html'
})
export class MasterComponent implements OnInit {
  /** Menus$  of master component */
  public menus: Menu[];
  /** Loged in user data$ of master component */
  public loggedInUserData: any;
  constructor(
    private oauthService: OAuthService,
    private authService: AuthService

  ) {
  }

  public ngOnInit(): void {
    this.menus = menuItem;
    // this.oauthService.loadUserProfile().then((res: UserInfo) => {
    //   this.loggedInUserData = res;
    // });
    this.loggedInUserData =this.authService.getClaimsData();
  }

}

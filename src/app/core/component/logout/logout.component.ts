import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'one-automation-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  /**
   * on init
   */
  public ngOnInit(): void {
    this.authService.logout();
  }

}

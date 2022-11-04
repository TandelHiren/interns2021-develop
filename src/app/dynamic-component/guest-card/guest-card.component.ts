import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.scss']
})
export class GuestCardComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }


  public login() {
    this.profileService.login();
  }
}

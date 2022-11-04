import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'one-automation-not-authorize',
  templateUrl: './not-authorize.component.html',
  styleUrls: ['./not-authorize.component.scss']
})
export class NotAuthorizeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backToHome() {
    this.router.navigate(['/'])
  }

}

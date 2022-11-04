import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {

  public isShow: boolean = false;
  public flag: boolean = false;
  public fetchData = [
    {
      "title": "saurabh",
      "description": "dd",
      "tagline": "tt",
      "date": "dd",
      "currency":'INR'
    },
    {
      "title": "aman",
      "description": "dd",
      "tagline": "tt",
      "date": "dd",
      "currency":'Dollar'
    },
    {
      "title": "jessica",
      "description": "dd",
      "tagline": "tt",
      "date": "dd",
      "currency":'Dollar'
    },
    {
      "title": "rosh",
      "description": "dd",
      "tagline": "tt",
      "date": "dd",
      "currency":'INR'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  public btnClick() {
    alert('button click');
  }
}

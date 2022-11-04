import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss']
})
export class PipeComponent implements OnInit {
  date = new Date();
  price = 10000;
  title = 'hiren tandel';
  search: string;
  list = [
    'Professor',
    'Tokyo',
    'Inspector',
    'Jen'
  ];
  constructor() { }

  ngOnInit() {
  }

}

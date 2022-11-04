import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { pairwise, take } from 'rxjs/operators';

@Component({
  selector: 'app-pair-wise',
  templateUrl: './pair-wise.component.html',
  styleUrls: ['./pair-wise.component.scss']
})
export class PairWiseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    interval(1000)
      .pipe(pairwise(), take(2))
      .subscribe(console.log);
  }

}

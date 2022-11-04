import { Component, OnInit } from '@angular/core';
import { ObservableService } from '../observable.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  showProducts: any
  constructor(private observableService: ObservableService) { }

  ngOnInit() {
    this.observableService.product().subscribe((res) => {
      this.showProducts = res;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { DesktopService } from '../desktop.service';
import { LaptopService } from '../laptop.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss'],
  providers: [
    DesktopService,
    {
      provide: LaptopService, useExisting: DesktopService
    }
  ]
})
export class ComputerComponent implements OnInit {
  computorName: any
  constructor(
    private desk: LaptopService
  ) { }

  ngOnInit() {
    // this.computorName = this.desk.getComputerName()
  }

}

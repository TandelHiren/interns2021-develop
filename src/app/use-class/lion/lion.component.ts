import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { LineService } from '../line.service';

@Component({
  selector: 'app-lion',
  templateUrl: './lion.component.html',
  styleUrls: ['./lion.component.scss'],
  providers:[
    {
      provide:AnimalService,
      useClass: LineService
    }
  ]
})
export class LionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

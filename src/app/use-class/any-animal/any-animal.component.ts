import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-any-animal',
  templateUrl: './any-animal.component.html',
  styleUrls: ['./any-animal.component.scss'],
  providers:[
    AnimalService
  ]
})
export class AnyAnimalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  name: string;
  food: string;
  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.name = this.animalService.getName();
    this.food = this.animalService.getFood();
  }

}

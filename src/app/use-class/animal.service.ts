import { Injectable } from '@angular/core';

@Injectable()
export class AnimalService {
  public name = 'Animal';
  public food = 'Food';




  public getName() {
    return this.name;
  }

  public getFood(){
    return this.food;
  }


}

import { Injectable } from '@angular/core';
import { AnimalService } from './animal.service';

@Injectable()
export class LineService extends AnimalService{

  public name = 'Lion';
  public food='Meat';
  
}

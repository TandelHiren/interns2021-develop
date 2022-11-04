import { Injectable } from '@angular/core';
import { AnimalService } from './animal.service';

@Injectable({
  providedIn: 'root'
})
export class CowService extends AnimalService{
  public name = 'cow';
  public food = 'Grass';


  
}

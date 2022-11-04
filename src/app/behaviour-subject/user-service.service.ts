import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}
   private user = new BehaviorSubject<string>('1Rivet');
   public castUser = this.user.asObservable();
   
   editUser(newUser){
     this.user.next(newUser); 
   }
}

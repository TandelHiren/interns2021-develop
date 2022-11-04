import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements OnInit {

  name = 'Angular';
  user:string;
  newUser:string;
  constructor(private userService:UserService){}
  ngOnInit(){
    this.userService.castUser.subscribe(user => this.user = user);

  }

  newUsers(user){
    this.userService.editUser(this.newUser);
  }
}

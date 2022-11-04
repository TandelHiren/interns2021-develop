import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {

  constructor(private userService: UserService){}
  name = 'Angular';
  user:string;
  newUser:string;
  ngOnInit(){
    this.userService.castUser.subscribe((user) => {
      this.user = user
    });
  }
  editedUser(user:string){
    this.userService.editUser(this.newUser);
  }

}

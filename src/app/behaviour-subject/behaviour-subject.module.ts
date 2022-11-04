import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehaviourSubjectRoutingModule } from './behaviour-subject-routing.module';
import { BehaviourSubjectComponent } from './behaviour-subject.component';
import { UserService } from './user-service.service';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BehaviourSubjectComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    CommonModule,
    BehaviourSubjectRoutingModule,
    FormsModule
  ],
  providers:[
    UserService
  ]
})
export class BehaviourSubjectModule { }

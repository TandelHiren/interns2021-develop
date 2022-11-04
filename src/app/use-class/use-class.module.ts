import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseClassRoutingModule } from './use-class-routing.module';
import { UseClassComponent } from './use-class.component';
import { UserService } from '../behaviour-subject/user-service.service';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { CowComponent } from './cow/cow.component';
import { LionComponent } from './lion/lion.component';
import { AnyAnimalComponent } from './any-animal/any-animal.component';

@NgModule({
  declarations: [UseClassComponent, AnimalDetailComponent, CowComponent, LionComponent, AnyAnimalComponent],
  imports: [
    CommonModule,
    UseClassRoutingModule
  ],
  providers:[
  ]
})
export class UseClassModule { }

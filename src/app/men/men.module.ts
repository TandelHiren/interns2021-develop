import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenRoutingModule } from './men-routing.module';
import { ShirtComponent } from './shirt/shirt.component';

@NgModule({
  declarations: [ShirtComponent],
  imports: [
    CommonModule,
    MenRoutingModule
  ]
})
export class MenModule { }

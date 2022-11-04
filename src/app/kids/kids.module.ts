import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsRoutingModule } from './kids-routing.module';
import { ShirtComponent } from './shirt/shirt.component';

@NgModule({
  declarations: [ShirtComponent],
  imports: [
    CommonModule,
    KidsRoutingModule
  ]
})
export class KidsModule { }

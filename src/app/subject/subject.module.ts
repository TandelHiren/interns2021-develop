import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { SubjectComponent } from './subject.component';
import { DataSharingService } from './datasharing.service';

@NgModule({
  declarations: [
    SubjectComponent,
    Component1Component,
    Component2Component,
    Component3Component
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule
  ],
  providers:[
    DataSharingService
  ]
})
export class SubjectModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { MapComponent } from './rxjs/map/map.component';
import { PromiseComponent } from './rxjs/promise/promise.component';
import { RxjsComponent } from './rxjs.component';
import { ObservableComponent } from './rxjs/observable/observable.component';
import { ObservableService } from './rxjs/observable.service';
import { ForkJoinComponent } from './rxjs/fork-join/fork-join.component';
import { MergeMapComponent } from './rxjs/merge-map/merge-map.component';
import { PairWiseComponent } from './rxjs/pair-wise/pair-wise.component';

@NgModule({
  declarations: [
    MapComponent, 
    PromiseComponent, 
    RxjsComponent, 
    ObservableComponent,
    ForkJoinComponent,
    MergeMapComponent,
    PairWiseComponent
  ],
  imports: [
    CommonModule,
    RxjsRoutingModule,
    
  ],
  providers:[ObservableService]
})
export class RxjsModule { }

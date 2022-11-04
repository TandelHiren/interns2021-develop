import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './rxjs/map/map.component';
import { RxjsComponent } from './rxjs.component';

const routes: Routes = [
  {
    path:'',
    component: RxjsComponent,
    children:[
      {
        path:'map',
        component:MapComponent
      },
      {
        path:'promise',
        component:MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShirtComponent } from './shirt/shirt.component';

const routes: Routes = [
  {
    path:'',
    component:ShirtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsRoutingModule { }

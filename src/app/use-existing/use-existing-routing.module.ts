import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseExistingComponent } from './use-existing.component';

const routes: Routes = [
  {
    path:'',
    component: UseExistingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseExistingRoutingModule { }

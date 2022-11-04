import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseClassComponent } from './use-class.component';

const routes: Routes = [
  {
    path:'',
    component: UseClassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseClassRoutingModule { }

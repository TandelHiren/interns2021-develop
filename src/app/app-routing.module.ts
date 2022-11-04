import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectiveComponent } from './directive/directive.component';
import { PipeComponent } from './pipe/pipe.component';
import { HostListnerComponent } from './host-listner/host-listner.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { KidsModule } from './kids/kids.module';
import { AuthCallbackComponent } from './core/component/auth-callback/auth-callback.component';
import { MasterComponent } from './core/component/master/master.component';
import { AuthGuard } from './core/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'directive',
        canActivate: [AuthGuard],
      },
      {
        path:'directive',
        component: DirectiveComponent,
        canActivate: [AuthGuard],
      },
      {
        path:'pipe',
        component: PipeComponent
      },
      {
        path:'host-listner',
        component: HostListnerComponent
      },
      {
        path:'bootstrap',
        component: BootstrapComponent
      },
      {
        path:'kids',
        component: KidsModule
      },
      {
        path:'subject',
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
      },
      {
        path:'behavior-subject',
        loadChildren: () => import('./behaviour-subject/behaviour-subject.module').then(m => m.BehaviourSubjectModule)
      },
      {
        path:'rxjs',
        loadChildren: () => import('./rxjs-1/rxjs/rxjs.module').then(m => m.RxjsModule)
      },
      {
        path:'use-class',
        loadChildren: () => import('./use-class/use-class.module').then(m => m.UseClassModule)
      },
      {
        path:'use-existing',
        loadChildren: () => import('./use-existing/use-existing.module').then(m => m.UseExistingModule)
      },
      {
        path:'dynamic-component',
        loadChildren: () => import('./dynamic-component/dynamic-component.module').then(m => m.DynamicComponentModule)
      }
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

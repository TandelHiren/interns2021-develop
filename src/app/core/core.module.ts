
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

import { authConfig } from './auth-config/auth.config';
import { AuthCallbackComponent } from './component/auth-callback/auth-callback.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MasterComponent } from './component/master/master.component';
import { NoRecordFoundComponent } from './component/no-record-found/no-record-found.component';
import { NotAuthorizeComponent } from './component/not-authorize/not-authorize.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { SidebarPresentationComponent } from './component/sidebar/sidebar-presentation/sidebar.presentation';
import { TopbarPresentationComponent } from './component/topbar/topbar-presentation/topbar.presentation';
import { AppResolverService } from './resolvers/app.resolver';
import { AuthService } from './services/auth/auth.service';
import { BreakPointObserverService } from './services/break-point-observer/break-point-observer.service';
import { ConfirmationModalService } from './services/confirmation-modal/confirmation-modal.service';
import { AuthGuard } from './services/guard/auth.guard';
import { HttpService } from './services/http/http.service';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { LoaderService } from './services/loader/loader.service';
import { SubMenuService } from './services/submenu/sub-menu.service';
import { TopbarService } from './services/topbar/topbar.service';
import { PopoverModule } from 'ngx-bootstrap';

export function storageFactory(): OAuthStorage {
  return localStorage;
}


@NgModule({
  declarations: [
    BreadcrumbComponent,
    LogoutComponent,
    MasterComponent,
    AuthCallbackComponent,
    TopbarPresentationComponent,
    SidebarPresentationComponent,
    NotFoundComponent,
    NoRecordFoundComponent,
    NotAuthorizeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    PopoverModule.forRoot(),
    // AuthPolicyModule.forRoot({
    //     url: environment.policy_url,
    //     clientId: environment.client_id,
    //     policyName: environment.policy_name,
    //     storageType: StorageType.localStorage
    //   })
  ],
  exports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    TopbarPresentationComponent,
    SidebarPresentationComponent,
    LogoutComponent,
    AuthCallbackComponent
  ],
  providers: [
    AuthGuard,
    //interceptorProviders,
    AuthService,
    LoaderService,
    TopbarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AppResolverService,
    ConfirmationModalService,
    SubMenuService,
    HttpService,
    BreakPointObserverService,
    { provide: 'environment', useValue: environment },
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthStorage, useFactory: storageFactory },
  ]
})
export class CoreModule {

}

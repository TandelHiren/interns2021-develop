import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentRoutingModule } from './dynamic-component-routing.module';
import { UserCardComponent } from './user-card/user-card.component';
import { GuestCardComponent } from './guest-card/guest-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHostDirective } from './profile-host.directive';
import { ProfileService } from './profile.service';
import { AlretComponent } from './alret/alret.component';

@NgModule({
  declarations: [UserCardComponent, GuestCardComponent, ProfileComponent, ProfileHostDirective,],
  imports: [
    CommonModule,
    DynamicComponentRoutingModule
  ],
  providers:[
    ProfileService
  ],
  entryComponents: [ GuestCardComponent, UserCardComponent ],
})
export class DynamicComponentModule { }

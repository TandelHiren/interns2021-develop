import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { AlretComponent } from '../alret/alret.component';
import { ProfileHostDirective } from '../profile-host.directive';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileHostDirective, { static: true }) public profileHost: ProfileHostDirective;
  private destroySubject = new Subject();
  componentRef: ComponentRef<AlretComponent>

  constructor(private profileService: ProfileService,
    private resolve: ComponentFactoryResolver) { }


  ngOnInit() {
    const viewContainerRef = this.profileHost.viewContainerRef;

    this.profileService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isLoggedIn =>
          this.profileService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }


  public createComponent(type) {
    const factory: ComponentFactory<AlretComponent> = this.resolve.resolveComponentFactory(AlretComponent);
    this.componentRef
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }



}


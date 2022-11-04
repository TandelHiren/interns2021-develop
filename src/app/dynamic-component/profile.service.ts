import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private isLoggedIn = new BehaviorSubject(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private cfr: ComponentFactoryResolver) { }


  login() {
    this.isLoggedIn.next(true);

  }
  logout() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(viewContainerRef: ViewContainerRef, isLoggedIn: boolean) {
    debugger
    const { GuestCardComponent } = await import('./guest-card/guest-card.component');
    const { UserCardComponent } = await import('./user-card/user-card.component');

    viewContainerRef.clear();

    let component: any = isLoggedIn ? UserCardComponent : GuestCardComponent;

    return viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(component)
    )




  }
}

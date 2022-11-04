import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AlretComponent } from './dynamic-component/alret/alret.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'class of 2021';

  @ViewChild("alertContainer", { read: ViewContainerRef, static: false }) container;
  componentRef: ComponentRef<AlretComponent>
  constructor(
    private resolve: ComponentFactoryResolver) { }


    public createComponent(type) {
      const factory: ComponentFactory<AlretComponent> = this.resolve.resolveComponentFactory(AlretComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.type= type;
      this.componentRef.instance.onDestroy.subscribe(event =>{
        console.log(event);
        
      })
    }
}

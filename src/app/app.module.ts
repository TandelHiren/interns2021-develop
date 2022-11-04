import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectiveComponent } from './directive/directive.component';
import { PipeComponent } from './pipe/pipe.component';
import { HostListnerComponent } from './host-listner/host-listner.component';
import { TitlecasePipe } from './pipe/tittle-Case.pipe';
import { ListfilterPipe } from './pipe/list-filter.pipe';
import { TruncatePipe } from './truncate.pipe';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import {HttpClientModule} from '@angular/common/http';
import { AlretComponent } from './dynamic-component/alret/alret.component';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [
    AppComponent,
    DirectiveComponent,
    PipeComponent,
    HostListnerComponent,
    TitlecasePipe,
    ListfilterPipe,
    TruncatePipe,
    BootstrapComponent,
    AlretComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  // entryComponents: [ BootstrapComponent, PipeComponent ]
  entryComponents:[AlretComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngDoBootstrap(app) {
    fetch('url/to/fetch/component/name')
      .then((name)=>{ bootstrapRootComponent(app, name)});
  }
 }
// app - reference to the running application (ApplicationRef)
// name - name (selector) of the component to bootstrap
function bootstrapRootComponent(app, name) {
  // define the possible bootstrap components 
  // with their selectors (html host elements)
  const options = {
    'app-bootstrap': BootstrapComponent,
    'app-pipe': PipeComponent
  };
  // obtain reference to the DOM element that shows status
  // and change the status to `Loaded`
  const statusElement = document.querySelector('#status');
  statusElement.textContent = 'Loaded';
  // create DOM element for the component being bootstrapped
  // and add it to the DOM
  const componentElement = document.createElement(name);
  document.body.appendChild(componentElement);
  // bootstrap the application with the selected component
  const component = options[name];
  app.bootstrap(component);
}

function fetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('app-bootstrap');
    }, 2000);
  });
}
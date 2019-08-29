import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiTestingComponent } from './components/api-testing/api-testing.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiTestingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

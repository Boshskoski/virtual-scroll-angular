import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VirtualScrollComponent } from './components/virtual-scroll/virtual-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualScrollComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

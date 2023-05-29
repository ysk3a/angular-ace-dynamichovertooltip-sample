import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTooltipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

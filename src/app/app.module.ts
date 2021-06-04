import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SnackModule } from './modules/common/snack/snack.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    LangSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SnackModule,
    TranslocoRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

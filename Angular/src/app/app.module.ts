import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HistoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([])
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { DriverComponent } from './components/driver/driver.component';
import { PassengerComponent } from './components/passenger/passenger.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HistoryComponent,
    LoginComponent,
    DriverComponent,
    PassengerComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([])
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    GoogleChartsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4KfeROyevO6Jczu4d8G1Onc4Rim7HO4c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

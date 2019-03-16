import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',

  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   pathMatch: 'full',

  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exception404Component } from './404.component';
import { LoginGuard } from './login.guard';
import { MainGuard } from './main.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canLoad: [LoginGuard]
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
    canLoad: [MainGuard]
  },
  {
    path: '**',
    component: Exception404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

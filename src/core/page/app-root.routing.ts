import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoutingModule } from '../../app/setting-manage/user/user-routing';
import { ApplicationRoutingModule } from '../../app/setting-manage/application/application-routing';
import { AuthRoutingModule } from '../../app/setting-manage/auth/auth-routing';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, UserRoutingModule, ApplicationRoutingModule, AuthRoutingModule]
  // exports: [UserRoutingModule]
})
export class AppRoutingModule { }

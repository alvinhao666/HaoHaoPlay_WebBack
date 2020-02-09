import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoutingModule} from '../../app/setting-manage/user/user.routing';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, UserRoutingModule]
  // exports: [UserRoutingModule]
})
export class AppRoutingModule { }

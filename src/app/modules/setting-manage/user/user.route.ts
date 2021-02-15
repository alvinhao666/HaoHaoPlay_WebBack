import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserListResolve } from './user-list.resolve';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: { userList: UserListResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserListResolve],
})
export class UserRoutingModule {}

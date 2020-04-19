import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { RoleListResolve } from './role.resolve';


const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    resolve: { roleList: RoleListResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoleListResolve]
})
export class RoleRoutingModule { }

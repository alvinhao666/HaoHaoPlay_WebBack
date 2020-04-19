import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RoleRoutingModule } from './role.route';
import { RoleComponent } from './role.component';
import { RoleEditComponent } from './role-edit/role-edit.component';


@NgModule({
  declarations: [RoleComponent, RoleEditComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule
  ]
})
export class RoleModule { }

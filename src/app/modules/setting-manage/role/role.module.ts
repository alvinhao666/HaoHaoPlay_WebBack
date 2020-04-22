import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { RoleRoutingModule } from './role.route';
import { RoleComponent } from './role.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

const NzModule = [
  NzButtonModule,
  NzCardModule,
  NzTableModule,
  NzTreeModule,
  NzMessageModule,
  NzModalModule
];

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NzModule
  ]
})
export class RoleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictRoutingModule } from './dict.route';
import { DictListComponent } from './dict-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { DictEditComponent } from './dict-edit/dict-edit.component';

const NzModule = [
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzIconModule,
  NzModalModule
];


@NgModule({
  declarations: [DictListComponent, DictEditComponent],
  imports: [
    CommonModule,
    DictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NzModule
  ]
})
export class DictModule { }

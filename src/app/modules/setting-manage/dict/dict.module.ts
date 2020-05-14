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
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DictEditComponent } from './dict-edit/dict-edit.component';
import { DictItemListComponent } from './dict-item-list/dict-item-list.component';
import { DictItemEditComponent } from './dict-item-edit/dict-item-edit.component';

const NzModule = [
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzIconModule,
  NzModalModule,
  NzInputNumberModule,
  NzPopconfirmModule
];


@NgModule({
  declarations: [DictListComponent, DictEditComponent, DictItemListComponent, DictItemListComponent, DictItemEditComponent],
  imports: [
    CommonModule,
    DictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NzModule
  ]
})
export class DictModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictRoutingModule } from './dict.route';
import { DictListComponent } from './dict-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

const NzModule = [
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule
];


@NgModule({
  declarations: [DictListComponent],
  imports: [
    CommonModule,
    DictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NzModule
  ]
})
export class DictModule { }

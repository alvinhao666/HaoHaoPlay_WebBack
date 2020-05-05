import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictRoutingModule } from './dict.route';
import { DictComponent } from './dict.component';


@NgModule({
  declarations: [DictComponent],
  imports: [
    CommonModule,
    DictRoutingModule
  ]
})
export class DictModule { }

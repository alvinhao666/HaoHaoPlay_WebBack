import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';

import { MainRouteModule } from './main.route';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NzModule = [
  NzLayoutModule,
  NzMessageModule,
  NzIconModule,
  NzDropDownModule,
  NzBreadCrumbModule,
  NzIconModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, MainRouteModule, ...NzModule],
  declarations: [MainComponent],
  entryComponents: [],
})
export class MainModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { PersonalRouteModule } from './personal.route';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { BaseInfoComponent } from './base-info/base-info.component';
import { SafeInfoComponent } from './safe-info/safe-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePwdComponent } from './update-pwd/update-pwd.component';
import { AvatarComponent } from './avatar/avatar.component';


const NzModule = [
  NzButtonModule,
  NzMessageModule,
  NzModalModule,
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzRadioModule,
  NzMenuModule,
  NzListModule
];


@NgModule({
  declarations: [PersonalComponent, BaseInfoComponent, SafeInfoComponent, UpdatePwdComponent, AvatarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PersonalRouteModule,
    ...NzModule
  ]
})
export class PersonalModule { }

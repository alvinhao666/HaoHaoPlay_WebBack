import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './user-edit/user-edit.componnent';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRoutingModule } from './user.route';

const NzModule = [
  NzLayoutModule,
  NzButtonModule,
  NzMessageModule,
  NzModalModule,
  NzIconModule,
  NzCardModule,
  NzFormModule,
  NzDropDownModule,
  NzTableModule,
  NzDrawerModule,
  NzUploadModule,
  NzDescriptionsModule,
  NzInputModule,
  NzSelectModule,
  NzDividerModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzRadioModule,
  NzGridModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ...NzModule,
  ],
  providers: [],
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
    UserViewComponent,
  ],
  entryComponents: [],
})
export class UserModule {}

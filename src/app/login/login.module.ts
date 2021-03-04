import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRouteModule } from './login.route';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';

const NzModule = [
  NzButtonModule,
  NzMessageModule,
  NzTabsModule,
  NzInputModule,
  NzCheckboxModule,
  NzFormModule,
];

@NgModule({
  imports: [LoginRouteModule, FormsModule, ReactiveFormsModule, ...NzModule],
  declarations: [LoginComponent],
  entryComponents: [],
})
export class LoginModule {}

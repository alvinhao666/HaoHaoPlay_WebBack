import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './edit/user-edit.componnent';

import { UserRoutingModule } from './user.route';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        UserRoutingModule
    ],
    providers: [],
    declarations: [UserListComponent, UserEditComponent],
    entryComponents: []
})
export class UserModule {
}

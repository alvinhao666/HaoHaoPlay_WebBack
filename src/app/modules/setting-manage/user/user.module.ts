import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './user-edit/user-edit.componnent';
import { UserViewComponent } from './user-view/user-view.component';
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
    declarations: [UserListComponent, UserEditComponent, UserViewComponent, UserViewComponent],
    entryComponents: []
})
export class UserModule {
}

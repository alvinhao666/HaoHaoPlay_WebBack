import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list';

const routes: Routes = [
    {
        path: 'setting',
        data: { breadcrumb: '设置' },
        children: [
            { path: 'user', component: UserListComponent, data: { breadcrumb: '用户管理' } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class UserRoutingModule {
}



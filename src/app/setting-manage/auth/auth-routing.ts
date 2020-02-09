import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthListComponent } from './auth-list';


const routes: Routes = [
    {
        path: 'setting',
        data: { breadcrumb: '设置' },
        children: [
            { path: 'auth', component: AuthListComponent, data: { breadcrumb: '权限管理' } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class AuthRoutingModule {
}



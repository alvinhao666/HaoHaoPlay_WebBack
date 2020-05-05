import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: '数据看板' } },
      { path: 'personal', loadChildren: './modules/personal/personal.module#PersonalModule', data: { breadcrumb: '个人设置' } },
      {
        path: 'setting',
        data: { breadcrumb: '设置' },
        children: [
          { path: 'user', loadChildren: './modules/setting-manage/user/user.module#UserModule', data: { breadcrumb: '用户管理' } },
          { path: 'app', loadChildren: './modules/setting-manage/application/application.module#ApplicationModule', data: { breadcrumb: '应用管理' } },
          { path: 'role', loadChildren: './modules/setting-manage/role/role.module#RoleModule', data: { breadcrumb: '角色管理' } },
          { path: 'dict', loadChildren: './modules/setting-manage/dict/dict.module#DictModule', data: { breadcrumb: '字典管理' } }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

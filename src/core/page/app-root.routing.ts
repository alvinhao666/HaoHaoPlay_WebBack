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
      { path: 'dashboard', loadChildren: '../../app/dashboard/index#DashboardModule', data: { breadcrumb: '数据看板' } },
      {
        path: 'setting',
        data: { breadcrumb: '设置' },
        children: [
          { path: 'user', loadChildren: '../../app/setting-manage/user/index#UserModule', data: { breadcrumb: '用户管理' } },
          { path: 'app', loadChildren: '../../app/setting-manage/application/index#ApplicationModule', data: { breadcrumb: '应用管理' } },
          { path: 'auth', loadChildren: '../../app/setting-manage/auth/index#AuthModule', data: { breadcrumb: '权限管理' } }
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
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

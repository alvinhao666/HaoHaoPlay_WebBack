import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, DatePipe, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { H_HttpInterceptor } from '../core';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';


registerLocaleData(zh);

const NzModule = [
  NzLayoutModule,
  NzButtonModule,
  NzMessageModule,
  NzIconModule,
  NzDropDownModule,
  NzBreadCrumbModule,
  NzTableModule,
  NzTabsModule,
  NzGridModule,
  NzInputModule,
  NzCheckboxModule,
  NzIconModule,
  NzFormModule
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...NzModule
  ],
  entryComponents: [],  // 动态加载的组件
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: H_HttpInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}

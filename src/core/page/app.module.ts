import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN, NzTabSetComponent } from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {HeaderUserComponent} from './main/header/user.component';
import { AppComponent } from './app-root.component';
import { Core } from '..';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreHttpInterceptor } from '../net/http.interceptor';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderUserComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDropDownModule
  ],
  entryComponents: [LoginComponent, MainComponent],  // 动态加载的组件
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CoreHttpInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(injector: Injector) {
    Core.injector = injector;
  }
}

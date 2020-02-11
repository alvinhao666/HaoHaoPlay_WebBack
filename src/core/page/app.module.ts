import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { Exception404Component } from './exception/404.component';
import { AppComponent } from './app-root.component';
import { AppRoutingModule } from './app-root.routing';
import { Core } from '..';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { H_HttpInterceptor } from '../net';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    Exception404Component
  ],
  imports: [
    AppRoutingModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: H_HttpInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(injector: Injector) {
    Core.injector = injector;
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
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
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDropDownModule
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

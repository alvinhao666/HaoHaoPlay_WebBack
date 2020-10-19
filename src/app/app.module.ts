import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
// import { registerLocaleData, DatePipe, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
// import zh from '@angular/common/locales/zh';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { H_HttpInterceptor } from '../core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';
import { NzMessageModule } from 'ng-zorro-antd/message'; //消息弹窗 全局 http拦截器里有引用


// registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMessageModule
  ],
  entryComponents: [],  // 动态加载的组件
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: H_HttpInterceptor, multi: true },
    // { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}

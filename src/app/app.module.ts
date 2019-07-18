import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/** 配置 zorro **/
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 表单配置
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// 配置路由
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpService } from './@core/utils/http.service';
import { AuthService } from './auth/auth.service';
import { DepartmentService } from './pages/system-setting/department-setting/department-service';

// 页面组件
import { AppComponent } from './app.component';
import { AppRoutingModule,ComponentList } from './app-routing'
// import { AuthComponent } from './auth/auth.component';
// import { PagesComponent } from './pages/pages.component';
// import { PersonalDesktopComponent } from './pages/personal-desktop/personal-desktop.component';
// import { SystemSettingComponent } from './pages/system-setting/system-setting.component';
// import { DepartmentSettingComponent } from './pages/system-setting/department-setting/department-setting.component';
// import { UserSettingComponent } from './pages/system-setting/user-setting/user-setting.component';
// import { LoginComponent } from './auth/login/login.component';
// import { ResetComponent } from './auth/reset/reset.component';


//路由复用策略
import { RouteReuseStrategy } from '@angular/router';
import { SimpleReuseStrategy } from './simple-reuse-strategy';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ComponentList
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },
    HttpService,
    AuthService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

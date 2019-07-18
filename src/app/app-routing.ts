import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { PersonalDesktopComponent } from './pages/personal-desktop/personal-desktop.component';
import { SystemSettingComponent } from './pages/system-setting/system-setting.component';
import { DepartmentSettingComponent } from './pages/system-setting/department-setting/department-setting.component';
import { UserSettingComponent } from './pages/system-setting/user-setting/user-setting.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full', 
  },
  { 
    path: 'auth', 
    children:[
        { 
            path: 'login',
            component: LoginComponent,
            data: { title: '登录', module: 'login', power: "SHOW" }
        },
        { 
            path: 'reset',
            component: ResetComponent ,
            data: { title: '忘记密码', module: 'reset', power: "SHOW" }
        },
    ]
  },
  { 
    path: 'home', 
    component: PagesComponent,
    data: { title: '首页', module: 'home', power: "SHOW" },
    children:[
        { 
            path: 'my',
            component: PersonalDesktopComponent,
            data: { title: '个人', module: 'my', power: "SHOW" }
        },
        { 
            path: 'dept',
            component: DepartmentSettingComponent ,
            data: { title: '部门', module: 'dept', power: "SHOW" }
        },
        { 
            path: 'user', 
            component: UserSettingComponent,
            data: { title: '用户', module: 'user', power: "SHOW" } }, 
    ] 
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const ComponentList=[
    AuthComponent,
    PagesComponent,
    PersonalDesktopComponent,
    SystemSettingComponent,
    DepartmentSettingComponent,
    UserSettingComponent,
    LoginComponent, 
    ResetComponent
]
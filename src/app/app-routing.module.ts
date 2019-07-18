import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // { path: '', component: PagesComponent },
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  { path: '**', redirectTo: ''},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

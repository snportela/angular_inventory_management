import {Routes} from '@angular/router';
import {Home} from './layouts/dashboard/pages/home/home';
import {Auth} from './layouts/auth/auth';
import {Dashboard} from './layouts/dashboard/dashboard';
import {AreaComponent} from './layouts/dashboard/pages/area/area-component';
import {Category} from './layouts/dashboard/pages/category/category';
import {Resource} from './layouts/dashboard/pages/resource/resource';
import {Loan} from './layouts/dashboard/pages/loan/loan';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
      {path: 'home', component: Home},
      {path: 'areas', component: AreaComponent},
      {path: 'categorias', component: Category},
      {path: 'inventario', component: Resource},
      {path: 'emprestimos', component: Loan},
    ]
  }
];

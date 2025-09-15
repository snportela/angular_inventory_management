import {Routes} from '@angular/router';
import {HomeComponent} from './layouts/dashboard/pages/home/home-component';
import {Auth} from './layouts/auth/auth';
import {Dashboard} from './layouts/dashboard/dashboard';
import {AreaComponent} from './layouts/dashboard/pages/area/area-component';
import {CategoryComponent} from './layouts/dashboard/pages/category/category-component';
import {ResourceComponent} from './layouts/dashboard/pages/resource/resource-component';
import {LoanComponent} from './layouts/dashboard/pages/loan/loan-component';

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
      {path: 'home', component: HomeComponent},
      {path: 'areas', component: AreaComponent},
      {path: 'categorias', component: CategoryComponent},
      {path: 'inventario', component: ResourceComponent},
      {path: 'emprestimos', component: LoanComponent},
    ]
  }
];

import {Routes} from '@angular/router';
import {HomeComponent} from './layouts/dashboard/pages/home/home-component';
import {Auth} from './layouts/auth/auth';
import {Dashboard} from './layouts/dashboard/dashboard';
import {AreaComponent} from './layouts/dashboard/pages/area/area-component';
import {CategoryComponent} from './layouts/dashboard/pages/category/category-component';
import {ResourceComponent} from './layouts/dashboard/pages/resource/resource-component';
import {LoanComponent} from './layouts/dashboard/pages/loan/loan-component';
import {EditAreaComponent} from './layouts/dashboard/pages/edit-area-component/edit-area-component';
import {EditCategoryComponent} from './layouts/dashboard/pages/edit-category-component/edit-category-component';

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
      {path: 'area', component: EditAreaComponent},
      {path: 'area/:id', component: EditAreaComponent},
      {path: 'categorias', component: CategoryComponent},
      {path: 'category', component: EditCategoryComponent},
      {path: 'category/:id', component: EditCategoryComponent},
      {path: 'inventario', component: ResourceComponent},
      {path: 'emprestimos', component: LoanComponent},
    ]
  }
];

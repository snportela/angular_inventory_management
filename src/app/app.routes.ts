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
import {EditResourceComponent} from './layouts/dashboard/pages/edit-resource-component/edit-resource-component';
import {EditLoanComponent} from './layouts/dashboard/pages/edit-loan-component/edit-loan-component';
import {ReceiptComponent} from './layouts/dashboard/pages/receipt/receipt-component';
import {EditReceiptComponent} from './layouts/dashboard/pages/edit-receipt-component/edit-receipt-component';
import {LoginComponent} from './layouts/auth/pages/login-component/login-component';
import {authGuard} from './guards/auth-guard';
import {RedeemPasswordComponent} from './layouts/auth/pages/redeem-password-component/redeem-password-component';
import {ResetPasswordComponent} from './layouts/auth/pages/reset-password-component/reset-password-component';
import {UserComponent} from './layouts/dashboard/pages/user-component/user-component';

export const routes: Routes = [
  {
    path: '', component: Auth,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: 'redefinir-senha', component: RedeemPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {
    path: 'dashboard', component: Dashboard,
    children: [
      {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'areas', component: AreaComponent},
      {path: 'area', component: EditAreaComponent},
      {path: 'area/:id', component: EditAreaComponent},
      {path: 'categorias', component: CategoryComponent},
      {path: 'categoria', component: EditCategoryComponent},
      {path: 'categoria/:id', component: EditCategoryComponent},
      {path: 'inventario', component: ResourceComponent},
      {path: 'item', component: EditResourceComponent},
      {path: 'item/:id', component: EditResourceComponent},
      {path: 'emprestimos', component: LoanComponent},
      {path: 'emprestimo', component: EditLoanComponent},
      {path: 'emprestimo/:id', component: EditLoanComponent},
      {path: 'notas-fiscais', component: ReceiptComponent},
      {path: 'nota-fiscal', component: EditReceiptComponent},
      {path: 'nota-fiscal/:id', component: EditReceiptComponent},
      {path: 'usuarios', component: UserComponent, canActivate: [authGuard]}
    ]
  }
];

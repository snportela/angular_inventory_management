import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.sass'
})
export class SidebarComponent {

  authService: AuthService = inject(AuthService);

  items = [
    {
      routeLink: 'home',
      icon: '',
      label: 'Home',
    },
    {
      routeLink: 'inventario',
      icon: '',
      label: 'Inventário',
    },
    {
      routeLink: 'areas',
      icon: '',
      label: 'Áreas',
    },
    {
      routeLink: 'categorias',
      icon: '',
      label: 'Categorias',
    },{
      routeLink: 'emprestimos',
      icon: '',
      label: 'Empréstimos',
    },{
      routeLink: 'notas-fiscais',
      icon: '',
      label: 'Notas Fiscais',
    }
  ];

  constructor() {
    if(this.authService.getUserRole() === 'ADMIN') {
      this.items.push({
        routeLink: 'usuarios',
        icon: '',
        label: 'Usuários',
      })
    }
  }

  logout() {
    this.authService.logout();
  }

}

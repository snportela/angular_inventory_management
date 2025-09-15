import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

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

  items = [
    {
      routeLink: 'home',
      icon: '',
      label: 'HomeComponent',
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
    },
  ];

}

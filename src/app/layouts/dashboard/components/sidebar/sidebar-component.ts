import {Component, computed, inject, Signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../../services/auth-service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.sass'
})
export class SidebarComponent {

  authService: AuthService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);
  public isMenuOpen = false;

  private breakpointState: Signal<BreakpointState | undefined> = toSignal( this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.HandsetPortrait
  ]));

  public isSmallScreen: Signal<boolean> = computed(() => this.breakpointState()?.matches ?? false);

  items = [
    {
      routeLink: 'home',
      icon: 'pi-home',
      label: 'Home',
    },
    {
      routeLink: 'inventario',
      icon: 'pi-warehouse',
      label: 'Inventário',
    },
    {
      routeLink: 'emprestimos',
      icon: 'pi-calendar',
      label: 'Empréstimos',
    },
    {
      routeLink: 'categorias',
      icon: 'pi-table',
      label: 'Categorias',
    },
    {
      routeLink: 'notas-fiscais',
      icon: 'pi-book',
      label: 'Notas Fiscais',
    },
    {
      routeLink: 'areas',
      icon: 'pi-objects-column',
      label: 'Áreas',
    }
  ];

  constructor() {
    if(this.authService.getUserRole() === 'ADMIN') {
      this.items.push({
        routeLink: 'usuarios',
        icon: 'pi-user',
        label: 'Usuários',
      })
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}

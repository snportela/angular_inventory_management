import { Component } from '@angular/core';
import {SidebarComponent} from './components/sidebar/sidebar-component';
import {RouterOutlet} from '@angular/router';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    RouterOutlet,
    ConfirmDialog,
    Toast
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass'
})
export class Dashboard {

}

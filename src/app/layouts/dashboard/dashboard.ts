import { Component } from '@angular/core';
import {Sidebar} from './components/sidebar/sidebar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass'
})
export class Dashboard {

}

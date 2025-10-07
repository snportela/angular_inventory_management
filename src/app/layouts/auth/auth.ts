import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet,
    Toast
  ],
  providers: [
    MessageService
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.sass'
})
export class Auth {

}

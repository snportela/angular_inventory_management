import {Component, inject, signal, WritableSignal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth-service';
import {Login} from '../../../../models/auth/login';
import {Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-login-component',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    ProgressSpinner,
    Message,
    RouterLink
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.sass'
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  private messageService = inject(MessageService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", Validators.required)
  })

  isLoading: WritableSignal<boolean> = signal(false);
  isInvalid: WritableSignal<boolean> = signal(false);

  onSubmit() {

    this.isLoading.set(true);
    this.isInvalid.set(false);

    const credentials = this.loginForm.value as Login;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if(res.token) {
          this.authService.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
          this.isLoading.set(false);

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível fazer o login.',
            life: 3000
          });

          this.isLoading.set(false);
        }
      },
      error:(error) => {
       this.isInvalid.set(true);
        this.isLoading.set(false);
      }
    })
  }

}

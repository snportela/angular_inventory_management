import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth-service';
import {Login} from '../../../../models/auth/login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.sass'
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", Validators.required)
  })

  onSubmit() {

    const credentials = this.loginForm.value as Login;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if(res.token) {
          this.authService.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        } else {
          console.log("Login failed")
        }
      },
      error:(error) => {
        console.log(error);
      }
    })
  }

}

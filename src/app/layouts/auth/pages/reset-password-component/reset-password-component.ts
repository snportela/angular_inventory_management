import {Component, inject, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../../../services/auth-service';
import {MessageService} from 'primeng/api';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ResetPassword} from '../../../../models/auth/reset-password';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password-component',
  imports: [
    ProgressSpinner,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.sass'
})
export class ResetPasswordComponent {

  private authService: AuthService = inject(AuthService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading: WritableSignal<boolean> = signal(false);

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmPassword: new FormControl("", [Validators.required])
  }, { validators: this.checkPasswords });

  token = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const token = params.get('token');
        return token ? String(token) : null;
      })
    ),
    { initialValue: '' }
  );

  onSubmit() {
    if(this.resetPasswordForm.invalid) return;

    this.isLoading.set(true);

    const formValue = this.resetPasswordForm.value;

    const payload: ResetPassword = {
      password: formValue.password,
      token: this.token()
    }

    this.authService.resetPassword(payload).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Senha redefinida com sucesso',
          detail: 'Redirecionando para login...',
          life: 3000
        });

        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000);

        this.isLoading.set(false);
      },
      error:(error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível redefinir a senha.',
          life: 3000
        });
        this.isLoading.set(false);
        console.error(error);
      }
    });
  }

}

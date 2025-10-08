import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProgressSpinner} from "primeng/progressspinner";
import {AuthService} from '../../../../services/auth-service';
import {MessageService} from 'primeng/api';
import {RedeemPassword} from '../../../../models/auth/redeem-password';

@Component({
  selector: 'app-redeem-password-component',
    imports: [
        FormsModule,
        ProgressSpinner,
        ReactiveFormsModule
    ],
  templateUrl: './redeem-password-component.html',
  styleUrl: './redeem-password-component.sass'
})
export class RedeemPasswordComponent {

  authService: AuthService = inject(AuthService);
  private messageService = inject(MessageService);

  isLoading: WritableSignal<boolean> = signal(false);

    redeemPasswordForm: FormGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });

    onSubmit() {
      this.isLoading.set(true);

      const formValue = this.redeemPasswordForm.value as RedeemPassword;

      this.authService.redeemPassword(formValue).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'info',
            summary: 'E-mail enviado',
            detail: 'Verifique seu e-mail.',
            life: 3000
          });

          this.isLoading.set(false);
        },
        error:(error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível enviar o e-mail.',
            life: 3000
          });
          this.isLoading.set(false);
          console.error('Delete failed', error);
        }
      });
    }
}

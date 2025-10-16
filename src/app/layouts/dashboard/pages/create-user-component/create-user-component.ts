import {Component, inject, signal, WritableSignal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {UserService} from '../../../../services/user-service';
import {UserRegister} from '../../../../models/user/user-register';
import {Router, RouterLink} from '@angular/router';
import {Password} from 'primeng/password';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-create-user-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    Password,
    Button
  ],
  templateUrl: './create-user-component.html',
  styleUrl: './create-user-component.sass'
})
export class CreateUserComponent {

  private userService: UserService = inject(UserService);
  private messageService = inject(MessageService);

  private router = inject(Router);

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  createUserForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmPassword: new FormControl("", [Validators.required])
  }, { validators: this.checkPasswords });

  isLoading: WritableSignal<boolean> = signal(false);

  onSubmit() {
    if(this.createUserForm.invalid) return;
    this.isLoading.set(true);

    const formValue = this.createUserForm.getRawValue();
    const payload: UserRegister = {
      ...formValue,
      role: 'USER'
    }

    this.userService.createUser(payload).subscribe({
      next: user => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Usuário criado com sucesso.`,
        life: 1500
      }),
      error: err => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível criar o Usuário.',
        life: 1500
      })
    });

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/usuarios');
    }, 1500);
  }

}

import {Component, inject, signal} from '@angular/core';
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

@Component({
  selector: 'app-create-user-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-user-component.html',
  styleUrl: './create-user-component.sass'
})
export class CreateUserComponent {

  private userService: UserService = inject(UserService);
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

  error = signal<string | null>(null);

  onSubmit() {
    if(this.createUserForm.invalid) return;

    const formValue = this.createUserForm.getRawValue();
    const payload: UserRegister = {
      ...formValue,
      role: 'USER'
    }

    this.userService.createUser(payload).subscribe({
      next: user => console.log("user created", user),
      error: err => this.error.set("failed to create user")
    });

    this.router.navigateByUrl('/dashboard/usuarios');
  }

}

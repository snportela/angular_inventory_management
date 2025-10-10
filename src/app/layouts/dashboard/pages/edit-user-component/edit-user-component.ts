import {Component, computed, effect, inject, signal} from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserService} from '../../../../services/user-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';
import {User} from '../../../../models/user/user';

@Component({
  selector: 'app-edit-user-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-user-component.html',
  styleUrl: './edit-user-component.sass'
})
export class EditUserComponent {

  private userService: UserService = inject(UserService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private userId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  error = signal<string | null>(null);

  editUserForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email])
  })

  user = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.userService.getUser(String(id));
      })
    ),
    {initialValue: null as User | null}
  );

  constructor() {
    effect(() => {
      const u = this.user();

      if(u) {
        this.editUserForm.patchValue({
          name: u.name,
          email: u.email
        });
      }
    });
  }

  onSubmit() {
    if(this.editUserForm.invalid) return;

    const data = this.editUserForm.value as Omit<User, 'userId'>;

    this.userService.updateUser(this.userId()!, data).subscribe({
      next: user => console.log("user updated", user),
      error: err => this.error.set("failed to update user")
    });

    this.router.navigateByUrl('/dashboard/usuarios');
  }
}

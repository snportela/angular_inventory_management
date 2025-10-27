import {Component, computed, effect, inject, Input, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CategoryService} from '../../../../services/category-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../../../../models/category/category';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-edit-category-component',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './edit-category-component.html',
  styleUrl: './edit-category-component.sass'
})
export class EditCategoryComponent {

  categoryService: CategoryService = inject(CategoryService);
  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categoryId = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const id = params.get('id');
        return id ? String(id) : null;
      })
    ),
    {initialValue: null}
  );

  isEdit = computed(() => this.categoryId());
  isLoading: WritableSignal<boolean> = signal(false);


  categoryForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required])
  });

  category = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.categoryService.getCategory(String(id));
      })
    ),
    {initialValue: null as Category | null}
  );

  constructor() {
    effect(() => {
      const c = this.category();
      if(c) {
        this.categoryForm.patchValue({
          name: c.name
        });
      }
    });
  }

  onSubmit() {
    if(this.categoryForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos necessários.',
        life: 1500
      });
      return;
    }

    const data = this.categoryForm.value as Omit<Category, 'id'>;
    this.isLoading.set(true);

    if (this.isEdit()) {
      this.categoryService.updateCategory(this.categoryId()!, data).subscribe({
        next: category => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Categoria atualizada com sucesso.`,
          life: 1500
        }),
        error: err => {
          if(err.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Uma Categoria com este nome já existe.',
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível atualizar a Categoria.',
              life: 1500
            })
          }
        }
      });
    } else {
      this.categoryService.createCategory(data).subscribe({
        next: category => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Categoria criada com sucesso.`,
          life: 1500
        }),
        error: err => {
          if(err.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Uma Categoria com este nome já existe.',
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível criar a Categoria.',
              life: 1500
            })
          }
        }
      });
    }

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/categorias');
    }, 1500)

  }

}

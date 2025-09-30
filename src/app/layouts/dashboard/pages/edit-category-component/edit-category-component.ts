import {Component, computed, effect, inject, Input, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CategoryService} from '../../../../services/category-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../../../../models/category/category';

@Component({
  selector: 'app-edit-category-component',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './edit-category-component.html',
  styleUrl: './edit-category-component.sass'
})
export class EditCategoryComponent {

  categoryService: CategoryService = inject(CategoryService);
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

  error = signal<string | null>(null);

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
    if(this.categoryForm.invalid) return;

    const data = this.categoryForm.value as Omit<Category, 'id'>;

    if (this.isEdit()) {
      this.categoryService.updateCategory(this.categoryId()!, data).subscribe({
        next: category => console.log('Area updated:', category),
        error: err => this.error.set('Failed to update category')
      });
    } else {
      this.categoryService.createCategory(data).subscribe({
        next: category => console.log('Area created:', category),
        error: err => this.error.set('Failed to create ' +
          'category')
      });
    }

    this.router.navigateByUrl('/dashboard/categorias');
  }

}

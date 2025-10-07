import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {CategoryService} from '../../../../services/category-service';
import {CategoryList} from '../../../../models/category/category-list';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-category',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle,
    RouterLink
  ],
  templateUrl: './category-component.html',
  styleUrl: './category-component.sass'
})
export class CategoryComponent {

  categoryService: CategoryService = inject(CategoryService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  first: number = 0;
  page = signal(0);
  size = signal(10);

  categoryList: WritableSignal<CategoryList> = signal({currentPage: 0, totalItems: 0, totalPages: 0, categories: []});

  constructor() {
    effect(() => {
      this.categoryService.getCategoryList(this.page(), this.size()).subscribe(data => this.categoryList.set(data));
    });
  }

  confirmDelete(category: {categoryId: string; name: string}): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a categoria "${category.name}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.categoryService.deleteCategory(category.categoryId).subscribe({
          next: () => {
            this.categoryList.update(currentState => {
              const updatedCategories = currentState.categories.filter(c => c.categoryId !== category.categoryId);
              return {...currentState, categories: updatedCategories};
            });

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Categoria "${category.name} excluída.`,
              life: 3000
            });
          },

          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir a categoria.',
              life: 3000
            });
            console.error('Delete failed', err);
          }
        });
      }
    });
  }
}

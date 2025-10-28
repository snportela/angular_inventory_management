import {Component, computed, effect, inject, Signal, signal, WritableSignal} from '@angular/core';
import {CategoryService} from '../../../../services/category-service';
import {CategoryList} from '../../../../models/category/category-list';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {finalize} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle,
    RouterLink,
    Skeleton
  ],
  templateUrl: './category-component.html',
  styleUrl: './category-component.sass'
})
export class CategoryComponent {

  categoryService: CategoryService = inject(CategoryService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private breakpointObserver = inject(BreakpointObserver);

  first: number = 0;
  page = signal(0);
  size = signal(20);
  isLoading: WritableSignal<boolean> = signal(true);

  categoryList: WritableSignal<CategoryList> = signal({currentPage: 0, totalItems: 0, totalPages: 0, categories: []});

  private breakpointState: Signal<BreakpointState | undefined> = toSignal( this.breakpointObserver.observe([
    Breakpoints.Large
  ]));

  public isHDScreen: Signal<boolean> = computed(() => this.breakpointState()?.matches ?? false);

  constructor() {
    effect(() => {

      this.categoryService.getCategoryList(this.page(), this.size()).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(data => this.categoryList.set(data));
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

import {Component, computed, inject, Signal} from '@angular/core';
import {CategoryService} from '../../../../services/category-service';
import {CategoryList} from '../../../../models/category/category-list';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle
  ],
  templateUrl: './category-component.html',
  styleUrl: './category-component.sass'
})
export class CategoryComponent {

  categoryService: CategoryService = inject(CategoryService);
  categoryList: Signal<CategoryList> = computed(() => this.categoryService.categoryList());

}

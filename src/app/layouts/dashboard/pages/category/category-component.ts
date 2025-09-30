import {Component, computed, inject, signal, Signal} from '@angular/core';
import {CategoryService} from '../../../../services/category-service';
import {CategoryList} from '../../../../models/category/category-list';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {AreaList} from '../../../../models/area/area-list';

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

  page = signal(0);
  rows: number = 10;

  categoryList: Signal<CategoryList> = toSignal(this.categoryService.getCategoryList(this.page(), this.rows),
    {initialValue: {} as CategoryList});
}

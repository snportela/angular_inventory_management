import {Category} from './category';

export interface CategoryList {
  totalItems: number,
  totalPages: number,
  categories: Category[],
  currentPage: number
}

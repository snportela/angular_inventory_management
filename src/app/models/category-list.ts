import {Category} from './category-reponse';

export interface CategoryList {
  totalItems: number,
  totalPages: number,
  categories: Category[],
  currentPage: number
}

import {inject, Injectable} from '@angular/core';
import {CategoryList} from '../models/category/category-list';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  getCategoryList(page: number, size: number): Observable<CategoryList> {
      return this.http.get<CategoryList>(`${this.api_url}/categories?page=${page}&size=${size}`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.api_url}/categories/${id}`);
  }

  createCategory(newCategory: Omit<Category, 'categoryId'>): Observable<Category> {
    return this.http.post<Category>(this.api_url + '/categories', newCategory);
  }

  updateCategory(id: string, updatedCategory: Omit<Category, 'categoryId'>): Observable<Category> {
    return this.http.put<Category>(`${this.api_url}/categories/${id}`, updatedCategory);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.api_url}/categories/${id}`);
  }

}

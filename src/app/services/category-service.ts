import {inject, Injectable} from '@angular/core';
import {CategoryList} from '../models/category-list';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  private categoryList$: Observable<CategoryList> = this.getCategoryList();
  public categoryList = toSignal(this.categoryList$, {
    initialValue: {totalItems: 0, totalPages: 0, categories: [], currentPage: 0},
  })

  getCategoryList(): Observable<CategoryList> {
      return this.http.get<CategoryList>(this.api_url + '/categories');
  }

}

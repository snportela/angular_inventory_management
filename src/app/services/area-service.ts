import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AreaList} from '../models/area/area-list';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  private areaList$: Observable<AreaList> = this.getAreaList();
  public areaList = toSignal(this.areaList$, {
    initialValue: {totalItems: 0, totalPages: 0, areas: [], currentPage: 0},
  });

  getAreaList(): Observable<AreaList> {
    return this.http.get<AreaList>(this.api_url + '/areas');
  }

}

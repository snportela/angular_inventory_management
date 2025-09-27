import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AreaList} from '../models/area/area-list';
import {Area} from '../models/area/area-response';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  getAreaList(): Observable<AreaList> {
    return this.http.get<AreaList>(this.api_url + '/areas');
  }

  getArea(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.api_url}/areas/${id}`);
  }

  createArea(newArea: Omit<Area, 'areaId'>): Observable<Area> {
    return this.http.post<Area>(this.api_url + '/areas', newArea);
  }

  updateArea(id: string, updatedArea: Omit<Area, 'areaId'>): Observable<Area>{
    return this.http.put<Area>(`${this.api_url}/areas/${id}`, updatedArea);
  }

  deleteArea(id: string): Observable<Area> {
    return this.http.delete<Area>(`${this.api_url}/areas/${id}`);
  }

}

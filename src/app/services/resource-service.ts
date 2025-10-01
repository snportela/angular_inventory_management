import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResourceList} from '../models/resource/resource-list';
import {Resource} from '../models/resource/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  getResourceList(page: number, size: number): Observable<ResourceList>
  {
    return this.http.get<ResourceList>(`${this.api_url}/resources?page=${page}&size=${size}`)
  }

  getResource(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.api_url}/resources/${id}`);
  }

  createResource(newResource: Omit<Resource, 'resourceId'>): Observable<Resource> {
    return this.http.post<Resource>(this.api_url + '/resources', newResource);
  }

  updateResource(id: string, updatedResource: Omit<Resource, 'resourceId'>): Observable<Resource> {
    return this.http.put<Resource>(`${this.api_url}/resources/${id}`, updatedResource);
  }

  deleteResource(id: string): Observable<Resource> {
    return this.http.delete<Resource>(`${this.api_url}/resources/${id}`);
  }

}

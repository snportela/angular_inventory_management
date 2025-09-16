import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResourceList} from '../models/resource-list';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  private resourceList$: Observable<ResourceList> = this.getResourceList();

  public resourceList = toSignal(this.resourceList$, {
    initialValue: { totalItems: 0, totalPages: 0, resources: [], currentPage: 0 },
  })

  getResourceList(): Observable<ResourceList>
  {
    return this.http.get<ResourceList>(this.api_url + '/resources')
  }

}

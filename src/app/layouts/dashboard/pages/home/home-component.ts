import {Component, effect, inject, Signal, signal, WritableSignal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {StatusPipe} from '../../../../pipes/status-pipe';
import {UseTimePipe} from '../../../../pipes/use-time-pipe';
import {ResourceService} from '../../../../services/resource-service';
import {AreaService} from '../../../../services/area-service';
import {CategoryService} from '../../../../services/category-service';
import {ResourceList} from '../../../../models/resource/resource-list';
import {AreaList} from '../../../../models/area/area-list';
import {toSignal} from '@angular/core/rxjs-interop';
import {CategoryList} from '../../../../models/category/category-list';
import {UserService} from '../../../../services/user-service';
import {AuthService} from '../../../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TableModule,
    StatusPipe,
    UseTimePipe
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.sass'
})
export class HomeComponent {

  private resourceService: ResourceService = inject(ResourceService);
  private areaService: AreaService = inject(AreaService);
  private categoryService: CategoryService = inject(CategoryService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);

  first: number = 0;
  page = signal(0);
  size = signal(10);

  userName: WritableSignal<string> = signal("");

  resourceList: WritableSignal<ResourceList> =  signal({currentPage: 0, totalItems: 0, totalPages: 0, resources: [] });

  areas: Signal<AreaList> = toSignal(this.areaService.getAreaList(this.page(), this.size()), {initialValue: {} as AreaList});

  categories: Signal<CategoryList> = toSignal(this.categoryService.getCategoryList(this.page(), this.size()),
    {initialValue: {} as CategoryList});

  constructor() {
    const userId = this.authService.getUserId();

    effect(() => {
      this.resourceService.getResourceList(this.page(), this.size()).subscribe(data => this.resourceList.set(data));

      this.userService.getUser(userId!).subscribe(data => this.userName.set(data.name.split(" ")[0]));
    });
  }
}

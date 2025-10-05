import {Component, inject, Signal} from '@angular/core';
import {ResourceService} from '../../../../services/resource-service';
import {ResourceList} from '../../../../models/resource/resource-list';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultiSelect} from 'primeng/multiselect';
import {AreaService} from '../../../../services/area-service';
import {CategoryService} from '../../../../services/category-service';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {CategoryList} from '../../../../models/category/category-list';
import {StatusPipe} from '../../../../pipes/status-pipe';
import {resourceStatus} from '../../../../data/resource-status';
import {useTime} from '../../../../data/use-time';
import {UseTimePipe} from '../../../../pipes/use-time-pipe';
import {AreaList} from '../../../../models/area/area-list';

@Component({
  selector: 'app-resource',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle,
    FormsModule,
    MultiSelect,
    RouterLink,
    StatusPipe,
    UseTimePipe
  ],
  templateUrl: './resource-component.html',
  styleUrl: './resource-component.sass'
})
export class ResourceComponent {

  resourceService: ResourceService = inject(ResourceService);
  areaService: AreaService = inject(AreaService);
  categoryService: CategoryService = inject(CategoryService);

  page: number = 1;
  size: number = 10;

  resourceList: Signal<ResourceList> = toSignal(this.resourceService.getResourceList(this.page, this.size), {initialValue: {} as ResourceList});

  areas: Signal<AreaList> = toSignal(this.areaService.getAreaList(this.page, this.size), {initialValue: {} as AreaList});

  categories: Signal<CategoryList> = toSignal(this.categoryService.getCategoryList(this.page, this.size),
    {initialValue: {} as CategoryList});

  status = resourceStatus;
  useTime = useTime;

}

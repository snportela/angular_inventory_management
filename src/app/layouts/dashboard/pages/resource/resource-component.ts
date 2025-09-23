import {Component, computed, inject, Signal} from '@angular/core';
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
    RouterLink
  ],
  templateUrl: './resource-component.html',
  styleUrl: './resource-component.sass'
})
export class ResourceComponent {

  resourceService: ResourceService = inject(ResourceService);
  resourceList: Signal<ResourceList> = computed(() => this.resourceService.resourceList());

  areaService: AreaService = inject(AreaService);
  areas: any = computed(() => this.areaService.areaList().areas);

  selectedAreas!: [];

  categoryService: CategoryService = inject(CategoryService);
  categories: any = computed(() => this.categoryService.categoryList().categories);

  selectedCategories!: [];


}

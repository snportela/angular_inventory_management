import {Component, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
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
import {ConfirmationService, MessageService} from 'primeng/api';

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
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  first: number = 0;
  page = signal(0);
  size = signal(10);

  resourceList: WritableSignal<ResourceList> =  signal({currentPage: 0, totalItems: 0, totalPages: 0, resources: [] });

  areas: Signal<AreaList> = toSignal(this.areaService.getAreaList(this.page(), this.size()), {initialValue: {} as AreaList});

  categories: Signal<CategoryList> = toSignal(this.categoryService.getCategoryList(this.page(), this.size()),
    {initialValue: {} as CategoryList});

  status = resourceStatus;
  useTime = useTime;

  constructor() {
    effect(() => {
      this.resourceService.getResourceList(this.page(), this.size()).subscribe(data => this.resourceList.set(data));
    });
  }

  confirmDelete(resource: {resourceId: string; name: string }) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o recurso "${resource.name}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.resourceService.deleteResource(resource.resourceId).subscribe({
          next: () => {
            this.resourceList.update(currentState => {
              const updatedResources = currentState.resources.filter(r => r.resourceId !== resource.resourceId);
              return {...currentState, resources: updatedResources};
            });

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Recurso "${resource.name}" excluído.`,
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir o recurso.',
              life: 3000
            });
            console.error('Delete failed', err);
          }
        });
      }
    });
  }

}

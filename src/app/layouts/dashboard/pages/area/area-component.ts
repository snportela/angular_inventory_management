import {Component, computed, effect, inject, Signal, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AreaService} from '../../../../services/area-service';
import {AreaList} from '../../../../models/area/area-list';
import {NgStyle} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RouterLink} from '@angular/router';
import {Skeleton} from 'primeng/skeleton';
import {finalize} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-area',
  imports: [
    TableModule,
    NgStyle,
    IconField,
    InputIcon,
    InputText,
    ConfirmDialogModule,
    RouterLink,
    Skeleton
  ],
  templateUrl: './area-component.html',
  styleUrl: './area-component.sass'
})
export class AreaComponent {

  areaService: AreaService = inject(AreaService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private breakpointObserver = inject(BreakpointObserver);

  first: number = 0;
  page = signal(0);
  rows = signal(20);
  isLoading: WritableSignal<boolean> = signal(true);

  areaList: WritableSignal<AreaList> = signal({currentPage: 0, totalItems: 0, totalPages: 0, areas: [] });

  private breakpointState: Signal<BreakpointState | undefined> = toSignal( this.breakpointObserver.observe([
    Breakpoints.Large
  ]));

  public isHDScreen: Signal<boolean> = computed(() => this.breakpointState()?.matches ?? false);

  constructor() {
    effect(() => {
      this.areaService.getAreaList(this.page(), this.rows())
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe(data => {
          this.areaList.set(data);
        });
    });
  }

  // onPageChange(event: { first: number; rows: number }) {
  //   this.page.set(event.first / event.rows);
  //   this.rows.set(event.rows);
  // }

  confirmDelete(area: { areaId: string; name: string }): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a área "${area.name}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.areaService.deleteArea(area.areaId).subscribe({
          next: () => {
            this.areaList.update(currentState => {
              const updatedAreas = currentState.areas.filter(a => a.areaId !== area.areaId);
              return { ...currentState, areas: updatedAreas };
            });

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Área "${area.name}" excluída.`,
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir a área.',
              life: 3000
            });
            console.error('Delete failed', err);
          }
        });
      }
    });
  }
}

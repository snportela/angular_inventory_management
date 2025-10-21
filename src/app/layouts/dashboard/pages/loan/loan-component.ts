import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {LoanService} from '../../../../services/loan-service';
import {LoanList} from '../../../../models/loan/loan-list';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {DatePipe, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Tag} from 'primeng/tag';
import {resourceStatus} from '../../../../data/resource-status';
import {LoanStatusPipe} from '../../../../pipes/loan-status-pipe';
import {Skeleton} from 'primeng/skeleton';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-loan',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle,
    DatePipe,
    RouterLink,
    Tag,
    LoanStatusPipe,
    Skeleton
  ],
  templateUrl: './loan-component.html',
  styleUrl: './loan-component.sass'
})
export class LoanComponent {

  first: number = 0;
  page = signal(0);
  size = signal(10);
  isLoading: WritableSignal<boolean> = signal(true);

  loanService: LoanService = inject(LoanService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  loanList: WritableSignal<LoanList> = signal({currentPage: 0, totalItems: 0, totalPages: 0, loans: [] });

  constructor() {
    effect(() => {
      this.loanService.getLoanList(this.page(), this.size()).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(data => this.loanList.set(data));
    });
  }

  confirmDelete(loan: {loanId: string}) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir este empréstimo?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.loanService.deleteLoan(loan.loanId).subscribe({
          next: () => {
            this.loanList.update(currentState => {
              const updatedLoans = currentState.loans.filter(
                l => l.loanId !== loan.loanId
              );
              return {...currentState, loans: updatedLoans}
            });

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Empréstimo" excluído.`,
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir o empréstimo.',
              life: 3000
            });
            console.error('Delete failed', err);
          }
        })
      }
    })
  }

  protected readonly status = resourceStatus;
}

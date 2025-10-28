import {Component, computed, effect, inject, Signal, signal, WritableSignal} from '@angular/core';
import {ReceiptService} from '../../../../services/receipt-service';
import {ReceiptList} from '../../../../models/receipt/receipt-list';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {CurrencyPipe, DatePipe, NgStyle} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {finalize} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-receipt',
  imports: [
    IconField,
    InputIcon,
    InputText,
    RouterLink,
    TableModule,
    NgStyle,
    DatePipe,
    CurrencyPipe,
    Skeleton
  ],
  templateUrl: './receipt-component.html',
  styleUrl: './receipt-component.sass'
})
export class ReceiptComponent {

  receiptService: ReceiptService = inject(ReceiptService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private breakpointObserver = inject(BreakpointObserver);

  first: number = 0;
  page = signal(0);
  size = signal(20);
  isLoading: WritableSignal<boolean> = signal(true);

  receiptList: WritableSignal<ReceiptList
  > =  signal({currentPage: 0, totalItems: 0, totalPages: 0, receipts: [] });

  private breakpointState: Signal<BreakpointState | undefined> = toSignal( this.breakpointObserver.observe([
    Breakpoints.Large
  ]));

  public isHDScreen: Signal<boolean> = computed(() => this.breakpointState()?.matches ?? false);

  constructor() {
    effect(() => {
      this.receiptService.getReceiptList(this.page(), this.size()).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(data => this.receiptList.set(data));
    });
  }

  confirmDelete(receipt: {receiptId: string; receiptNumber:string}) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a nota fiscal "${receipt.receiptNumber}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.receiptService.deleteReceipt(receipt.receiptId).subscribe({
          next: () => {
            this.receiptList.update(currentState => {
              const updatedReceipts = currentState.receipts.filter(r => r.receiptId !== receipt.receiptId);
              return {...currentState, receipts: updatedReceipts}
            });

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Nota Fiscal "${receipt.receiptNumber}" excluída.`,
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir a nota fiscal.',
              life: 3000
            });
            console.error('Delete failed', err);
          }
        });
      }
    });
  }

}

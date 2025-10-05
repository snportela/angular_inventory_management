import {Component, inject} from '@angular/core';
import {ReceiptService} from '../../../../services/receipt-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ReceiptList} from '../../../../models/receipt/receipt-list';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {DatePipe, NgStyle} from '@angular/common';

@Component({
  selector: 'app-receipt',
  imports: [
    IconField,
    InputIcon,
    InputText,
    RouterLink,
    TableModule,
    NgStyle,
    DatePipe
  ],
  templateUrl: './receipt-component.html',
  styleUrl: './receipt-component.sass'
})
export class ReceiptComponent {

  receiptService: ReceiptService = inject(ReceiptService);

  page: number = 1;
  size: number = 10;

  receiptList = toSignal(this.receiptService.getReceiptList(this.page, this.size),
    {initialValue: {} as ReceiptList})

}

import {Component, computed, inject, Signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {LoanService} from '../../../../services/loan-service';
import {LoanList} from '../../../../models/loan/loan-list';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {DatePipe, NgStyle} from '@angular/common';

@Component({
  selector: 'app-loan',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    NgStyle,
    DatePipe
  ],
  templateUrl: './loan-component.html',
  styleUrl: './loan-component.sass'
})
export class LoanComponent {

  loanService: LoanService = inject(LoanService);
  loanList: Signal<LoanList> = computed(() => this.loanService.loanList());

}

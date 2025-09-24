import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-edit-receipt-component',
  imports: [
    RouterLink,
    DatePicker,
    Select
  ],
  templateUrl: './edit-receipt-component.html',
  styleUrl: './edit-receipt-component.sass'
})
export class EditReceiptComponent {

  @Input() id = '';

}

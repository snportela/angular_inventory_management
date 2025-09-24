import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePicker} from 'primeng/datepicker';
import {FormsModule} from '@angular/forms';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-edit-loan-component',
  imports: [
    RouterLink,
    DatePicker,
    FormsModule,
    Select
  ],
  templateUrl: './edit-loan-component.html',
  styleUrl: './edit-loan-component.sass'
})
export class EditLoanComponent {
  @Input() id = '';

  datetime24h: Date[] | undefined;

  categories = [{
    'name': 'a',
  },
    {    'name': 'b'},
    {
      'name': 'c'}]
  selectedCategory = ''


}

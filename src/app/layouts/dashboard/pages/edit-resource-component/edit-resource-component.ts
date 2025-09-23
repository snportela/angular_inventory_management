import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-edit-resource-component',
  imports: [
    RouterLink,
    FormsModule,
    Select
  ],
  templateUrl: './edit-resource-component.html',
  styleUrl: './edit-resource-component.sass'
})
export class EditResourceComponent {
  @Input() id = '';

  categories = [{
    'name': 'a',
  },
    {    'name': 'b'},
    {
      'name': 'c'}]
  selectedCategory = ''

}

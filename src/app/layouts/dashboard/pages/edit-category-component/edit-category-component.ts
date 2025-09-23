import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-edit-category-component',
    imports: [
        RouterLink
    ],
  templateUrl: './edit-category-component.html',
  styleUrl: './edit-category-component.sass'
})
export class EditCategoryComponent {
  @Input() id = '';

}

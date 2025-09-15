import {Component, computed, inject, Signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AreaService} from '../../../../services/area-service';
import {AreaList} from '../../../../models/area-list';
import {NgStyle} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-area',
  imports: [
    TableModule,
    NgStyle,
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './area-component.html',
  styleUrl: './area-component.sass'
})
export class AreaComponent {

  areaService: AreaService = inject(AreaService);
  areaList: Signal<AreaList> = computed(() => this.areaService.areaList());

}

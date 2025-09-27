import {Component, computed, inject, Signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AreaService} from '../../../../services/area-service';
import {AreaList} from '../../../../models/area/area-list';
import {NgStyle} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-area',
  imports: [
    TableModule,
    NgStyle,
    IconField,
    InputIcon,
    InputText,
    RouterLink
  ],
  templateUrl: './area-component.html',
  styleUrl: './area-component.sass'
})
export class AreaComponent {

  areaService: AreaService = inject(AreaService);
  areaList: Signal<AreaList> = toSignal(this.areaService.getAreaList(),
    {initialValue: {} as AreaList});

}

import {Component, inject, signal, Signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AreaService} from '../../../../services/area-service';
import {AreaList} from '../../../../models/area/area-list';
import {NgStyle} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Paginator} from 'primeng/paginator';

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
  page = signal(0);

  first: number = 0;
  rows: number = 10;

  areaList: Signal<AreaList> = toSignal(this.areaService.getAreaList(this.page(), this.rows),
    {initialValue: {} as AreaList});
}

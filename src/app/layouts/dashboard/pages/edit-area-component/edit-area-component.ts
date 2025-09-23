import {Component, computed, effect, inject, Input, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AreaService} from '../../../../services/area-service';
import {Area} from '../../../../models/area/area-response';
import {toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-edit-area-component',
  imports: [
    RouterLink
  ],
  templateUrl: './edit-area-component.html',
  styleUrl: './edit-area-component.sass'
})
export class EditAreaComponent {

  router: Router = new Router();
  private route = inject(ActivatedRoute);
  areaService: AreaService = inject(AreaService);
  @Input() id = '';

  area = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = String(params.get('id'));
        return this.areaService.getArea(id);
      })
    ),
    { initialValue: null  }
  );

  constructor() {
    effect(() => {
      console.log(this.area())
    });
  }
}

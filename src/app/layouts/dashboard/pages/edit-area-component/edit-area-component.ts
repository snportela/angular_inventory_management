import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AreaService} from '../../../../services/area-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Area} from '../../../../models/area/area';
import {map, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-edit-area-component',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './edit-area-component.html',
  styleUrl: './edit-area-component.sass'
})
export class EditAreaComponent {

  areaService: AreaService = inject(AreaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  areaId = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const id = params.get('id');
        return id ? String(id) : null;
      })
    ),
    { initialValue: null }
  );

  isEdit = computed(() => this.areaId() !== null);

  error = signal<string | null>(null);

  areaForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(100)])
  })

  area = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null);
        return this.areaService.getArea(String(id));
      })
    ),
    { initialValue: null as Area | null }
  );

  constructor() {
    effect(() => {
      const a = this.area();
      if (a) {
        this.areaForm.patchValue({
          name: a.name
        });
      }
    })
  }

  onSubmit() {
    if (this.areaForm.invalid) return;

    const data = this.areaForm.value as Omit<Area, 'id'>;

    if (this.isEdit()) {
      this.areaService.updateArea(this.areaId()!, data).subscribe({
        next: area => console.log('Area updated:', area),
        error: err => this.error.set('Failed to update area')
      });
    } else {
      this.areaService.createArea(data).subscribe({
        next: area => console.log('Area created:', area),
        error: err => this.error.set('Failed to create area')
      });
    }

    this.router.navigateByUrl('/dashboard/areas');

  }

}

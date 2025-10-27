import {Component, computed, effect, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AreaService} from '../../../../services/area-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Area} from '../../../../models/area/area';
import {map, of, switchMap} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-edit-area-component',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './edit-area-component.html',
  styleUrl: './edit-area-component.sass'
})
export class EditAreaComponent {

  areaService: AreaService = inject(AreaService);
  private messageService = inject(MessageService);

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
  isLoading: WritableSignal<boolean> = signal(false);

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
    if (this.areaForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos necessários.',
        life: 1500
      });
      return;
    }

    const data = this.areaForm.value as Omit<Area, 'id'>;
    this.isLoading.set(true);

    if (this.isEdit()) {
      this.areaService.updateArea(this.areaId()!, data).subscribe({
        next: area => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Área atualizada com sucesso.`,
            life: 1500
          })
        },
        error: err => {
          if(err.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Uma Área com este nome já existe.',
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível editar a Área.',
              life: 1500
            })
          }
        }
      });
    } else {
      this.areaService.createArea(data).subscribe({
        next: area => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Área criada com sucesso.`,
          life: 1500
        }),
        error: err => {
          if(err.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Uma Área com este nome já existe.',
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível criar a Área.',
              life: 1500
            })
          }
        }
      });
    }

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/areas');
    }, 1500)

  }

}

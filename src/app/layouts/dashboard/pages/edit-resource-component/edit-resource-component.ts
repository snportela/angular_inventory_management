import {Component, computed, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {AreaService} from '../../../../services/area-service';
import {CategoryService} from '../../../../services/category-service';
import {AreaList} from '../../../../models/area/area-list';
import {toSignal} from '@angular/core/rxjs-interop';
import {CategoryList} from '../../../../models/category/category-list';
import {resourceStatus} from '../../../../data/resource-status';
import {useTime} from '../../../../data/use-time';
import {repairState} from '../../../../data/repair-state';
import {Resource} from '../../../../models/resource/resource';
import {ResourceService} from '../../../../services/resource-service';
import {map, of, switchMap} from 'rxjs';
import {ReceiptList} from '../../../../models/receipt/receipt-list';
import {ReceiptService} from '../../../../services/receipt-service';
import {CurrencyMaskDirective} from '../../../../directives/currency-mask';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-resource-component',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskDirective,
    Button,
    Select
  ],
  templateUrl: './edit-resource-component.html',
  styleUrl: './edit-resource-component.sass'
})
export class EditResourceComponent {
  page: number = 1;
  size: number = 100;

  private resourceService: ResourceService = inject(ResourceService);
  private areaService: AreaService = inject(AreaService);
  private categoryService: CategoryService = inject(CategoryService);
  private receiptService: ReceiptService = inject(ReceiptService);
  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly status = resourceStatus;
  readonly useTime = useTime;
  readonly repairState = repairState;

  private resourceId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  areaList: Signal<AreaList> = toSignal(this.areaService.getAreaList(this.page, this.size), {initialValue: {} as AreaList});

  categoryList: Signal<CategoryList> = toSignal(this.categoryService.getCategoryList(this.page, this.size),
    {initialValue: {} as CategoryList});

  receiptList: Signal<ReceiptList> = toSignal(this.receiptService.getReceiptList(this.page, this.size), {initialValue: {} as ReceiptList});

  isEdit = computed(() => this.resourceId());
  isLoading: WritableSignal<boolean> = signal(false);

  resourceForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    area: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    repairState: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    resourceNumber: new FormControl(""),
    serialNumber: new FormControl(""),
    manufactureYear: new FormControl(""),
    useTime: new FormControl("", Validators.required),
    location: new FormControl(""),
    receipt: new FormControl(null),
    price: new FormControl(null),
    observation: new FormControl("")
  });


  resource = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.resourceService.getResource(String(id));
      })
    ),
    {initialValue: null as Resource | null}
  );


  constructor() {
    effect(() => {
      const r = this.resource();

      setTimeout(() => {
        if (r) {
          this.resourceForm.patchValue({
            name: r.name,
            category: r.category,
            area: r.area,
            receipt: r.receipt,
            repairState: r.repairState,
            status: r.status,
            useTime: r.useTime,
            location: r.location,
            description: r.description,
            resourceNumber: r.resourceNumber,
            serialNumber: r.serialNumber,
            manufactureYear: r.manufactureYear,
            price: r.price,
            observation: r.observation
          });
        }
      }, 100)

    });
  }

  onSubmit() {
    if (this.resourceForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos necessários.',
        life: 1500
      });
      return;
    }

    this.isLoading.set(true);

    const data = this.resourceForm.getRawValue() as Omit<Resource, 'resourceId'>;

    if (this.isEdit()) {
      this.resourceService.updateResource(this.resourceId()!, data).subscribe({
        next: resource => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Item atualizado com sucesso.`,
          life: 1500
        }),
        error:( err: HttpErrorResponse) => {
          if(err.status == 409) {

            let message = err.error.message.slice(21).split(" ");
            let param;
            if(message[1] == "number") {
              param = "número de patrimônio"
            } else {
              param = "nome"
            }

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Um Item com este ${param} já existe.`,
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível editar o Item.',
              life: 1500
            })
          }
        }
      });
    } else {
      this.resourceService.createResource(data).subscribe({
        next: resource => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Item criado com sucesso.`,
          life: 1500
        }),
        error: err => {
          if(err.status == 409) {

            let message = err.error.message.slice(21).split(" ");
            let param;
            if(message[1] == "number") {
              param = "número de patrimônio"
            } else {
              param = "nome"
            }

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Um Item com este ${param} já existe.`,
              life: 1500
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível criar o Item.',
              life: 1500
            })
          }
        }
      });
    }

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/inventario');
    }, 1500);
  }

}

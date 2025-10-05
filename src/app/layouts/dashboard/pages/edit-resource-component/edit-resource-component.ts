import {Component, computed, effect, inject, signal, Signal} from '@angular/core';
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

@Component({
  selector: 'app-edit-resource-component',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
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

  error = signal<string | null>(null);

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
    receipt: new FormControl(""),
    price: new FormControl(""),
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
      if (r) {
        this.resourceForm.patchValue({
          name: r.name,
          category: r.category?.categoryId,
          area: r.area?.areaId,
          receipt: r.receipt?.receiptId,
          repairState: r.repairState,
          status: r.status,
          useTime: r.useTime,
          description: r.description,
          resourceNumber: r.resourceNumber,
          serialNumber: r.serialNumber,
          manufactureYear: r.manufactureYear,
          price: r.price,
          observation: r.observation
        });
      }
    });
  }


  onSubmit() {
    if (this.resourceForm.invalid) return;

    const formValue = this.resourceForm.getRawValue();

    const selectedCategory = this.categoryList().categories.find(c => c.categoryId === formValue.category);
    const selectedArea = this.areaList().areas.find(a => a.areaId === formValue.area);
    const selectedReceipt = this.receiptList().receipts.find(r => r.receiptId === formValue.receipt);

    const payload: Omit<Resource, 'resourceId'> = {
      ...formValue,
      category: selectedCategory || null,
      area: selectedArea || null,
      receipt: selectedReceipt || null
    };

    console.log(payload)

    if (this.isEdit()) {
      this.resourceService.updateResource(this.resourceId()!, payload).subscribe({
        next: resource => console.log('Resource updated:', resource),
        error: err => this.error.set('Failed to update resource')
      });
    } else {
      this.resourceService.createResource(payload).subscribe({
        next: resource => console.log('Resource created:', resource),
        error: err => this.error.set('Failed to create ' +
          'resource')
      });
    }

    this.router.navigateByUrl('/dashboard/inventario');
  }

}

import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePicker} from 'primeng/datepicker';
import {ReceiptService} from '../../../../services/receipt-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Receipt} from '../../../../models/receipt/receipt';
import {CurrencyMaskDirective} from '../../../../directives/currency-mask';

@Component({
  selector: 'app-edit-receipt-component',
  imports: [
    RouterLink,
    DatePicker,
    ReactiveFormsModule,
    CurrencyMaskDirective
  ],
  templateUrl: './edit-receipt-component.html',
  styleUrl: './edit-receipt-component.sass'
})
export class EditReceiptComponent {
  page: number = 1;
  size: number = 100;

  private receiptService: ReceiptService = inject(ReceiptService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private receiptId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  isEdit = computed(() => this.receiptId());

  error = signal<string | null>(null);

  receiptForm: FormGroup = new FormGroup({
    receiptNumber: new FormControl("", Validators.required),
    price: new FormControl(null, Validators.required),
    supplier: new FormControl("", Validators.required),
    receiptDate: new FormControl("", Validators.required)
  });

  receipt = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.receiptService.getReceipt(String(id));
      })
    ),
    {initialValue: null as Receipt | null}
  );

  constructor() {
    effect(() => {
      const r = this.receipt();

      if(r) {
        this.receiptForm.patchValue({
          receiptNumber: r.receiptNumber,
          price: r.price,
          supplier: r.supplier,
          receiptDate: new Date(r.receiptDate)
        });
      }
    });
  }

  onSubmit() {

    if(this.receiptForm.invalid) return;

    const formValue = this.receiptForm.getRawValue();

    const formatedDate = formValue.receiptDate.toISOString();

    const payload: Omit<Receipt, 'receiptId'> = {
      ...formValue,
      receiptDate: formatedDate || null
    }

    if(this.isEdit()) {
      this.receiptService.updateReceipt(this.receiptId()!, payload).subscribe({
        next: receipt => console.log('Receipt updated', receipt),
        error: err => this.error.set('Failed to update receipt')
      });
    } else {
      this.receiptService.createReceipt(payload).subscribe({
        next: receipt => console.log('Receipt created: ', receipt),
        error: err => this.error.set('Failed to create receipt' )
      });
    }

    this.router.navigateByUrl('/dashboard/notas-fiscais');
  }
}

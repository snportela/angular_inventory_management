import {Component, computed, effect, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePicker} from 'primeng/datepicker';
import {ReceiptService} from '../../../../services/receipt-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, of, switchMap} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Receipt} from '../../../../models/receipt/receipt';
import {CurrencyMaskDirective} from '../../../../directives/currency-mask';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-edit-receipt-component',
  imports: [
    RouterLink,
    DatePicker,
    ReactiveFormsModule,
    CurrencyMaskDirective,
    Button
  ],
  templateUrl: './edit-receipt-component.html',
  styleUrl: './edit-receipt-component.sass'
})
export class EditReceiptComponent {
  page: number = 1;
  size: number = 100;

  private receiptService: ReceiptService = inject(ReceiptService);
  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private receiptId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  isEdit = computed(() => this.receiptId());
  isLoading: WritableSignal<boolean> = signal(false);

  receiptForm: FormGroup = new FormGroup({
    receiptNumber: new FormControl("", Validators.required),
    accessKey: new FormControl(""),
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
          accessKey: r.accessKey,
          price: r.price,
          supplier: r.supplier,
          receiptDate: new Date(r.receiptDate)
        });
      }
    });
  }

  onSubmit() {

    if(this.receiptForm.invalid) return;
    this.isLoading.set(true);

    const formValue = this.receiptForm.getRawValue();

    const formatedDate = formValue.receiptDate.toISOString();

    const payload: Omit<Receipt, 'receiptId'> = {
      ...formValue,
      receiptDate: formatedDate || null
    }

    if(this.isEdit()) {
      this.receiptService.updateReceipt(this.receiptId()!, payload).subscribe({
        next: receipt => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Nota Fiscal atualizada com sucesso.`,
          life: 1500
        }),
        error: err => this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível editar a Nota Fiscal.',
          life: 1500
        })
      });
    } else {
      this.receiptService.createReceipt(payload).subscribe({
        next: receipt => this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Nota Fiscal criada com sucesso.`,
          life: 1500
        }),
        error: err => this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar a Nota Fiscal.',
          life: 1500
        })
      });
    }

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/notas-fiscais');
    }, 1500)
  }
}

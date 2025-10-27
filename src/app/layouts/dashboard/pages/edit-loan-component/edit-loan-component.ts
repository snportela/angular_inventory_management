import {Component, computed, effect, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePicker} from 'primeng/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {loanStatus} from '../../../../data/loan-status';
import {toSignal} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/resource-service';
import {concat, map, of, switchMap} from 'rxjs';
import {LoanService} from '../../../../services/loan-service';
import {Loan} from '../../../../models/loan/loan';
import {MultiSelect} from 'primeng/multiselect';
import {LoanItemResponse} from '../../../../models/loan/loan-item-response';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-edit-loan-component',
  imports: [
    RouterLink,
    DatePicker,
    FormsModule,
    Select,
    ReactiveFormsModule,
    MultiSelect,
    Button
  ],
  templateUrl: './edit-loan-component.html',
  styleUrl: './edit-loan-component.sass'
})
export class EditLoanComponent {
  page: number = 1;
  size: number = 100;

  private loanService: LoanService = inject(LoanService);
  private resourceService: ResourceService = inject(ResourceService);
  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly loanStatus = loanStatus;

  private loanId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  isEdit = computed(() => this.loanId());
  isLoading: WritableSignal<boolean> = signal(false);

  loanForm: FormGroup = new FormGroup({
    studentName: new FormControl("", Validators.required),
    studentId: new FormControl("", Validators.required),
    loanDate: new FormControl("", Validators.required),
    dueDate: new FormControl("", Validators.required),
    loanStatus: new FormControl("", Validators.required),
    loanItems: new FormControl([], Validators.required),
    observation: new FormControl("")
  });

  loan = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.loanService.getLoan(String(id));
      })
    ),
    {initialValue: null as Loan | null}
  );

  loanItems = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(!id) return of(null);
        return this.loanService.getItemsByLoanId(String(id));
      })
    ),
    {initialValue: null as LoanItemResponse[] | null}
  )

  resourceList = toSignal(this.resourceService.getResourceList(this.page, this.size), {initialValue: {currentPage: 0, totalItems: 0, totalPages: 0, resources: [] }});

  constructor() {
    effect(() => {
      const l = this.loan();
      const i = this.loanItems();

      setTimeout(() => {
        if(l && i) {
          let ids = i.map(i => i.resourceId);

          this.loanForm.patchValue({
            studentName: l.studentName,
            studentId: l.studentId,
            loanDate: new Date(l.loanDate),
            dueDate: new Date(l.dueDate),
            loanStatus: l.loanStatus,
            observation: l.observation,
            loanItems: ids
          });
        }
      }, 100)
    });
  }

  onSubmit() {

    if(this.loanForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos necessários.',
        life: 1500
      });
      return;
    }
    this.isLoading.set(true);

    const formValue = this.loanForm.getRawValue();

    const loanPayload: Omit<Loan, 'loanId'> = {
      studentName: formValue.studentName,
      studentId: formValue.studentId,
      loanDate: formValue.loanDate,
      dueDate: formValue.dueDate,
      loanStatus: formValue.loanStatus,
      observation: formValue.observation
    }

    const resources = formValue.loanItems;

    if(this.isEdit()) {

      concat( this.loanService.removeAllItemsFromLoan(this.loanId()!), this.loanService.updateLoan(this.loanId()!, loanPayload)).subscribe({
        next: loan => {
          console.log('Loan created: ', loan)
          resources.forEach((r: string) => {
            const loanItem = {
              loanId: this.loanId()!,
              resourceId: r
            }
            this.loanService.addLoanItems(loanItem).subscribe({
              next: loanItem => this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Empréstimo atualizado com sucesso.`,
                life: 1500
              }),
              error: err =>  console.log(err)
            })
          })
        },
        error: err => console.log(err)
      })

    } else {
      this.loanService.createLoan(loanPayload).subscribe({
        next: loan => {
          console.log('Loan created: ', loan)
          resources.forEach((r: string) => {
            const loanItem = {
              loanId: loan.loanId,
              resourceId: r
            }
              this.loanService.addLoanItems(loanItem).subscribe({
                next: loanItem => this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: `Empréstimo criado com sucesso.`,
                  life: 1500
                }),
                error: err => console.log(err)
              })
          })
        },
        error: err => console.log(err)
      })
    }

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/dashboard/emprestimos');
    }, 1500)

  }
}

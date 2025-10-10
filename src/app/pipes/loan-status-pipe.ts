import { Pipe, PipeTransform } from '@angular/core';
import {loanStatus} from '../data/loan-status';


@Pipe({
  name: 'loanStatus'
})
export class LoanStatusPipe implements PipeTransform {

  transform(value: string, severity?: boolean): string {

    const loan = loanStatus.find(loan => loan.name == value);

    if(severity) return loan!.severity;

    return loan!.translation;
  }

}

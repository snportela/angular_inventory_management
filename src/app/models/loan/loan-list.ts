import {Loan} from './loan-response';

export interface LoanList {
  totalItems: number,
  totalPages: number,
  loans: Loan[],
  currentPage: number
}

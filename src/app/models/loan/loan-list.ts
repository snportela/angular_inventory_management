import {Loan} from './loan';

export interface LoanList {
  totalItems: number,
  totalPages: number,
  loans: Loan[],
  currentPage: number
}

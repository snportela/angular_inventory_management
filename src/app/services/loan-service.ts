import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoanList} from '../models/loan/loan-list';
import {Loan} from '../models/loan/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  getLoanList(page: number, size: number, loanStatus?: string): Observable<LoanList>
  {
    if(loanStatus) {
      return this.http.get<LoanList>(`${this.api_url}/loans?page=${page}&size=${size}&loanStatus=${loanStatus}`);
    }

    return this.http.get<LoanList>(`${this.api_url}/loans?page=${page}&size=${size}`);
  }

  getLoan(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.api_url}/loans/${id}`);
  }

  createLoan(newLoan: Omit<Loan, 'loanId'>): Observable<Loan> {
    return this.http.post<Loan>(this.api_url + '/loans', newLoan);
  }

  updateLoan(id: string, updatedLoan: Omit<Loan, 'loanId'>): Observable<Loan> {
    return this.http.put<Loan>(`${this.api_url}/loans/${id}`, updatedLoan);
  }

  deleteLoan(id: string): Observable<Loan> {
    return this.http.delete<Loan>(`${this.api_url}/loans/${id}`);
  }

}

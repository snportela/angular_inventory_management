import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoanList} from '../models/loan/loan-list';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  private loanList$: Observable<LoanList> = this.getLoanList();
  public loanList = toSignal(this.loanList$, {
    initialValue: {totalItems: 0, totalPages: 0, loans: [], currentPage: 0},
  });

  getLoanList(): Observable<LoanList>
  {
    return this.http.get<LoanList>(this.api_url + '/loans');
  }

}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {Observable} from 'rxjs';
import {ReceiptList} from '../models/receipt/receipt-list';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private api_url: string = environment.API_URL;
  private http: HttpClient = inject(HttpClient);

  getReceiptList():Observable<ReceiptList> {
    return this.http.get<ReceiptList>(this.api_url + '/receipts');
  }

}

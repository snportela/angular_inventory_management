import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {Observable} from 'rxjs';
import {ReceiptList} from '../models/receipt/receipt-list';
import {Receipt} from '../models/receipt/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private api_url: string = environment.API_URL;
  private http: HttpClient = inject(HttpClient);

  getReceiptList(page: number, size: number):Observable<ReceiptList> {
    return this.http.get<ReceiptList>(`${this.api_url}/receipts?page=${page}&size=${size}`);
  }

  getReceipt(id: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.api_url}/receipts/${id}`);
  }

  createReceipt(newReceipt: Omit<Receipt, 'receiptId'>): Observable<Receipt> {
    return this.http.post<Receipt>(this.api_url + '/receipts', newReceipt);
  }

  updateReceipt(id: string, updatedReceipt: Omit<Receipt, 'receiptId'>): Observable<Receipt> {
    return this.http.put<Receipt>(`${this.api_url}/receipts/${id}`, updatedReceipt);
  }

  deleteReceipt(id: string): Observable<Receipt> {
    return this.http.delete<Receipt>(`${this.api_url}/receipts/${id}`);
  }

}

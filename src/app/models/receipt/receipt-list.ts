import {Receipt} from './receipt-response';

export interface ReceiptList {
  totalItems: number,
  totalPages: number,
  receipts: Receipt[],
  currentPage: number
}

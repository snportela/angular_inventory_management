import {Receipt} from './receipt';

export interface ReceiptList {
  totalItems: number,
  totalPages: number,
  receipts: Receipt[],
  currentPage: number
}

import {Area} from './area-response';

export interface AreaList{
  totalItems: number,
  totalPages: number,
  areas: Area[],
  currentPage: number
}

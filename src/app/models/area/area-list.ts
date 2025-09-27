import {Area} from './area';

export interface AreaList{
  totalItems: number,
  totalPages: number,
  areas: Area[],
  currentPage: number
}

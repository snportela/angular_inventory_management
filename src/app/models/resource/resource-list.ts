import {Resource} from './resource';

export interface ResourceList {
  totalItems: number,
  totalPages: number,
  resources: Resource[],
  currentPage: number
}

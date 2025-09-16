import {Resource} from './resource-reponse';

export interface ResourceList {
  totalItems: number,
  totalPages: number,
  resources: Resource[],
  currentPage: number
}

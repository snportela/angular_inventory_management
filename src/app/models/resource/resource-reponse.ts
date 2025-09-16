import {Area} from '../area/area-response';
import {Category} from '../category/category-reponse';

export interface Resource {
  resourceId: string,
  area: Area,
  category: Category,
  name: string,
  description: string,
  manufactureYear: string,
  serialNumber: string,
  repairState: string,
  resourceNumber: string,
  status: string,
  observation: string,
  useTime: string
}

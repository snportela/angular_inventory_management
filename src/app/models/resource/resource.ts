import {Area} from '../area/area';
import {Category} from '../category/category';

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

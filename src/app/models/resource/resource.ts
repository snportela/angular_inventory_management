import {Area} from '../area/area';
import {Category} from '../category/category';
import {Receipt} from '../receipt/receipt';

export interface Resource {
  resourceId: string,
  area: Area,
  category: Category,
  receipt: Receipt,
  price: number,
  name: string,
  description: string,
  manufactureYear: string,
  serialNumber: string,
  repairState: string,
  resourceNumber: string,
  status: string,
  observation: string,
  useTime: string,
  location: string
}

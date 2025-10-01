import { Pipe, PipeTransform } from '@angular/core';
import {resourceStatus} from '../data/resource-status';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    const status = resourceStatus.find(status => status.name == value);

    return status?.translation;

  }

}


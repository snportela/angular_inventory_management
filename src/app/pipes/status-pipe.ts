import { Pipe, PipeTransform } from '@angular/core';
import {resourceStatus} from '../data/resource-status';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, severity?: boolean): string {

    const status = resourceStatus.find(status => status.name == value);

    if(severity) return status!.severity;

    return status!.translation;

  }

}


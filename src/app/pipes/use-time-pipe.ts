import { Pipe, PipeTransform } from '@angular/core';
import {useTime} from '../data/use-time'

@Pipe({
  name: 'useTime'
})
export class UseTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const time = useTime.find(
      useTime => useTime.name == value);

    return time?.translation;
  }

}

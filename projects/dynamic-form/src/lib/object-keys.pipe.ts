import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
})
export class ObjectKeysPipe implements PipeTransform {
  transform(param: { [key: string]: any }): string[] {
    return Object.keys(param);
  }
}

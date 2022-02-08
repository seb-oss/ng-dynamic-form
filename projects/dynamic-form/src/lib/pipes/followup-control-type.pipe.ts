import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followUpControlType',
})
export class FollowUpControlTypePipe implements PipeTransform {
  transform(key: any): string {
    return this.retrieveFollowUpControlsType(key);
  }

  retrieveFollowUpControlsType(key: any): string {
    if (key.value?.followUpItems) {
      return key.value?.followUpItems.type;
    }
  }
}

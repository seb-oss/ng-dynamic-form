import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DatepickerComponent } from '@sebgroup/ng-components';

@Component({
  selector: 'app-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormDatepickerComponent extends DatepickerComponent {
  /** Element label */
  @Input() label: string = '';
}

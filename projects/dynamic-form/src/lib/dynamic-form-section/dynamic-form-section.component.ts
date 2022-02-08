import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Provider,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DynamicFormField } from '../model/models';

const CUSTOM_FORMSECTION_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicFormSectionComponent),
  multi: true,
};

@Component({
  selector: 'app-dynamic-form-section',
  templateUrl: './dynamic-form-section.component.html',
  // providers: [CUSTOM_FORMSECTION_CONTROL_VALUE_ACCESSOR],
})
export class DynamicFormSectionComponent<T> {
  @Input()
  title?: string | null;

  @Input()
  formGroup: FormGroup;

  @Input()
  category?: string | null;

  @Input()
  description?: string | null;

  @Input()
  text?: string | null;

  @Input()
  className?: string | null;

  @Input()
  name?: string | null;

  @Input()
  order?: number;

  @Input()
  multi?: boolean;

  @Input()
  sectionType?: any;

  @Input()
  fields: DynamicFormField<T>[];

  @Input()
  customTemplate?: TemplateRef<any>;

  // // accessor props
  // writeValue(val: T): void {
  //   this._value = val;
  // }

  // registerOnChange(fn: () => void): void {
  //   this.onChangeCallback = fn;
  // }

  // registerOnTouched(fn: () => void): void {
  //   console.log("test tocuh")
  //   this.onTouchedCallback = fn;
  // }
}

import {
  FormGroup,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
// import { DynamicFormSection } from '../../model/dynamicFormSection';
import { ExtendedFormControl } from './extended-form-control';
import { ExtendedFormArray } from './extended-form-array';
import { ExtendedFormGroupArray } from './extended-form-group-array';
export interface ExtendedFormGroupControls {
  [key: string]: ExtendedFormGroupControl | ExtendedFormGroup;
}

export type ExtendedFormGroupControl =
  | ExtendedFormControl
  | ExtendedFormArray
  | ExtendedFormGroup
  | ExtendedFormGroupArray;

export class ExtendedFormGroup extends FormGroup {
  sectionItem: any;

  constructor(
    controls: ExtendedFormGroupControls,
    item?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.sectionItem = item;
  }

  get(path: string | (string | number)[]): ExtendedFormGroupControl {
    return super.get(path) as ExtendedFormGroupControl;
  }
}

import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicFormField } from '.';
import { DynamicFormSection, FieldWithValue } from './model/dynamicFormItem';

@Injectable()
export class DynamicFormControlService<T> {
  constructor() {}

  buildForm(fields: DynamicFormField<T>[]): FormGroup {
    const group: FormGroup = new FormGroup({});
    fields.forEach((field: DynamicFormField<T>) => {
      switch(field.controlType) {
        case "Section": this.addSubGroup(field, group);
        default: this.addFieldControl(field as FieldWithValue<T>, group);
      }
    });
    return group;
  }

  private addSubGroup(field: DynamicFormSection<T>, group: FormGroup) {
    group.addControl(field.name as string, this.buildForm(field.fields));
  }

  private addFieldControl(field: FieldWithValue<T>, group: FormGroup) {
    let control: FormArray | FormControl;
    if (field.multi) {
      control = this.createArray(field);
    } else {
      control = this.createControl(field);
    }
    group.addControl(field.name, control);
  }

  private createArray(field: FieldWithValue<T>): FormArray {
    return new FormArray(field.value as any, this.bindValidations(field.validations))
  }

  private createControl(
    field: FieldWithValue<T>
  ): FormControl {
    return new FormControl(
      field.value,
      this.bindValidations(field.validations || [])
    );
  }

  private bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
}

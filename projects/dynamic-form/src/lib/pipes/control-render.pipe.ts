import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormItem } from '../model/dynamicFormItem';
import {
  DynamicFormOption,
  ExtendedFormControl,
  ExtendedFormGroup,
  ExtendedFormGroupArray,
} from '../model/models';

@Pipe({
  name: 'controlRender',
})
export class ControlRenderPipe implements PipeTransform {
  transform(
    formGroup: ExtendedFormGroup,
    key: string,
    formItem: DynamicFormItem,
    index?: number
  ): boolean {
    const test = this.shouldRenderControl(formGroup, key, formItem, index);
    console.log(formGroup, key, test)
    return test;
  }

  /**
   * SHOULD RENDER CONTROL:
   * Determines if the form control should be rendered or not.
   * @param key section key
   * @param formItem the target form item that should or should not be displayed
   * @param index if the formgroup is an array this is the index of the formgroup item
   */
  shouldRenderControl(
    formGroup: ExtendedFormGroup,
    key: string,
    formItem: DynamicFormItem,
    index?: number
  ): boolean {
    if (formGroup.controls)
      if (formItem?.rulerKey) {
        // It has a ruler key, trying to find the ruler and it's value
        let ruler: ExtendedFormControl;
        if (index > -1) {
          // the form control where the ruler should be is an array
          const target: ExtendedFormControl = (formGroup.get(
            key
          ) as ExtendedFormGroupArray)
            .at(index)
            .get(formItem.rulerKey) as ExtendedFormControl;
          if (target) {
            ruler = target;
          }
        } else {
          // no array index: the form control where the ruler should be is a regular form
          ruler = formGroup
            ?.get(key)
            ?.get(formItem.rulerKey) as ExtendedFormControl;
        }
        const rulerValue: any = ruler.value;
        const { condition }: DynamicFormItem = formItem;
        if (rulerValue === undefined || condition === undefined) {
          console.warn(
            'Something went wrong in shouldRenderControl: Ruler value or condition could not be found.'
          );
          return false;
        }
        if (
          typeof rulerValue === 'string' &&
          rulerValue === (condition as any)
        ) {
          return this.shouldRenderControl(formGroup, key, ruler.formItem, index);
        } else if (
          rulerValue &&
          condition &&
          typeof condition === 'object' &&
          Array.isArray(condition)
        ) {
          for (const conditionItem of condition as Array<any>) {
            if (conditionItem) {
              if (typeof rulerValue === 'object' && Array.isArray(rulerValue)) {
                for (const rulerValueItem of rulerValue as Array<any>) {
                  if (
                    rulerValueItem &&
                    rulerValueItem.value === conditionItem.value
                  ) {
                    return this.shouldRenderControl(formGroup, key, ruler.formItem, index);
                  }
                }
              } else if (
                typeof rulerValue === 'object' &&
                !Array.isArray(rulerValue)
              ) {
                if (rulerValue && rulerValue.value === conditionItem.value) {
                  return this.shouldRenderControl(formGroup, key, ruler.formItem, index);
                }
              }
            }
          }
        } else if (
          rulerValue &&
          typeof rulerValue === 'object' &&
          !Array.isArray(rulerValue) &&
          rulerValue.value === (condition as DynamicFormOption).value
        ) {
          return this.shouldRenderControl(formGroup, key, ruler.formItem, index);
        } else if (
          rulerValue &&
          typeof rulerValue === 'boolean' &&
          rulerValue === condition
        ) {
          return this.shouldRenderControl(formGroup, key, ruler.formItem, index);
        }
        return false;
      }
    return true;
  }
}

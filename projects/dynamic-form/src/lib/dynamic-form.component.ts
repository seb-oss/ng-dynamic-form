import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeyValue } from '@angular/common';
import {
  DynamicFormItem,
  DynamicFormOption,
  ConfirmInformation,
} from './model/models';
import {
  ExtendedFormGroup,
  ExtendedFormGroupControls,
} from './model/custom-classes/extended-form-group';
import { ExtendedFormControl } from './model/custom-classes/extended-form-control';
import { ExtendedFormArray } from './model/custom-classes/extended-form-array';
import { ExtendedFormGroupArray } from './model/custom-classes/extended-form-group-array';
import { FormService } from './form.service';
import { IFormAction } from './i-form-action.enum';

interface IDynamicFormValidationError {
  key: string;
  errorMessage: string;
  sectionId: string;
  sectionIndex: number;
  formItem: Partial<DynamicFormItem>;
}


/** some comment */
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FormService],
  styles: [
    `
      ::ng-deep .dynamic-form-section-item {
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class DynamicFormComponent {
  @Input() extendedFormGroup: ExtendedFormGroup;
  @Input() activeStep: number;
  @Input() sectionTemplate: TemplateRef<any>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() actionsTemplate: TemplateRef<any>;
  @Input() disclaimerTemplate: TemplateRef<any>;
  @Input() inputMetadataTemplate: TemplateRef<any>;
  @Input() textAreaTemplate: TemplateRef<any>;
  @Input() numberTemplate: TemplateRef<any>;
  @Input() checkboxTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;
  @Input() datePickerTemplate: TemplateRef<any>;
  @Input() radioTemplate: TemplateRef<any>;
  @Input() radioTableTemplate: TemplateRef<any>;
  @Input() toggleSelectorTemplate: TemplateRef<any>;
  @Input() cardTemplate: TemplateRef<any>;
  @Input() itemCustomClass: string;
  @Input() hasFormActions: boolean = true;
  // used to compare current rules with saved data
  @Input() savedFormData: { key: string; value: string | number | boolean }[] = [];
  @Input() nextAction: IFormAction = {
    hasAction: true,
    label: 'Next',
  };
  @Input() previousAction: IFormAction = {
    hasAction: true,
    label: 'Previous',
  };
  @Input() cancelAction: IFormAction = {
    hasAction: true,
    label: 'Cancel',
  };

  @Input() saveAction: IFormAction = {
    hasAction: true,
    label: 'Save',
  };
  @Input() deleteAction: IFormAction = {
    hasAction: true,
    label: 'Delete',
  };
  @Output() previousEvent: EventEmitter<any> = new EventEmitter();
  @Output() nextEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  submitted: boolean = false;
  confirmationToggle: boolean = false;
  confirmationData: ConfirmInformation = null;

  newFormGroup: {
    form: ExtendedFormGroup;
    index: number;
    parentKey: string;
  } = {
      form: null,
      index: null,
      parentKey: null,
    };

  followUpModalToggle: boolean = false;

  constructor(
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) { }

  shouldRenderFollowUpControlsType(key: any): string {
    if (key.value?.followUpItems) {
      return key.value?.followUpItems.type;
    }
  }

  dimissFollowUpModal(item: ExtendedFormControl): void {
    this.followUpModalToggle = false;
    !item.formGroup && item?.reset();
  }

  saveFollowUpModal(param: {
    item: ExtendedFormGroup;
    control: ExtendedFormControl;
  }): void {
    const { item, control } = param;
    if (item.valid) {
      if (this.newFormGroup.index !== null) {
        (control.formGroup as ExtendedFormGroupArray).setControl(
          this.newFormGroup.index,
          item
        );
      } else {
        if (!control.formGroup?.controls?.length) {
          control.formGroup = new ExtendedFormGroupArray([item]);
        } else {
          (control.formGroup as ExtendedFormGroupArray).push(item);
        }
      }
      this.followUpModalToggle = false;
      this.cd.detectChanges();
    }
  }

  createFormGroup(param: { items: any; key: string }) {
    this.newFormGroup = {
      form: this.formService.dynamicFormSectionsToFormGroup(param.items),
      index: null,
      parentKey: param.key,
    };
    this.followUpModalToggle = true;
  }

  modalShouldBeRendered(control): boolean {
    if (
      control.value?.followUpItems?.items?.length &&
      control.formItem.key === this.newFormGroup.parentKey
    ) {
      return !!this.newFormGroup.form;
    }
  }

  /**
   * SHOULD RENDER CONTROL:
   * Determines if the form control should be rendered or not.
   * @param key section key
   * @param formItem the target form item that should or should not be displayed
   * @param index if the formgroup is an array this is the index of the formgroup item
   */
  shouldRenderControl(
    key: string,
    formItem: DynamicFormItem,
    index?: number
  ): boolean {
    if (this.extendedFormGroup.controls)
      if (formItem?.rulerKey) {
        // It has a ruler key, trying to find the ruler and it's value
        let ruler: ExtendedFormControl;
        if (index > -1) {
          // the form control where the ruler should be is an array
          const target: ExtendedFormControl = (this.extendedFormGroup.get(
            key
          ) as ExtendedFormGroupArray)
            .at(index)
            .get(formItem.rulerKey) as ExtendedFormControl;
          if (target) {
            ruler = target;
          }
        } else {
          // no array index: the form control where the ruler should be is a regular form
          ruler = this.extendedFormGroup
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
          return this.shouldRenderControl(key, ruler.formItem, index);
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
                    return this.shouldRenderControl(key, ruler.formItem, index);
                  }
                }
              } else if (
                typeof rulerValue === 'object' &&
                !Array.isArray(rulerValue)
              ) {
                if (rulerValue && rulerValue.value === conditionItem.value) {
                  return this.shouldRenderControl(key, ruler.formItem, index);
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
          return this.shouldRenderControl(key, ruler.formItem, index);
        } else if (
          rulerValue &&
          typeof rulerValue === 'boolean' &&
          rulerValue === condition
        ) {
          return this.shouldRenderControl(key, ruler.formItem, index);
        }
        return false;
      }
    return true;
  }

  /**
   * ADD NEW ITEM TO FORM ARRAY WITH ID:
   * Duplicates the whole section or a form item within a section
   * @param key section key
   * @param id the id of the form item which should be duplicated
   * @param sectionIndex if the formgroup is an array this is the index of the formgroup item
   */
  addNewItemToFormArrayWithId(
    key: string,
    id?: string,
    sectionIndex?: number
  ): void {
    if (id) {
      // There is an id which means we want to duplicate a form item within a section
      if (sectionIndex > -1) {
        // the form control where the item to duplicate should be is an array
        const target: ExtendedFormArray = (this.extendedFormGroup.get(
          key
        ) as ExtendedFormGroupArray).at(sectionIndex) as ExtendedFormArray;
        (target.get(id) as ExtendedFormArray).push(new FormControl(''));
      } else {
        // the form control is not an array since there is no section index
        (this.extendedFormGroup.get(key).get(id) as ExtendedFormArray).push(
          new FormControl('')
        );
      }
    } else {
      // There is no id which means we want to duplicate the entire section
      const target: ExtendedFormGroupArray = this.extendedFormGroup.get(
        key
      ) as ExtendedFormGroupArray;
      const childControls: ExtendedFormGroupControls = this.formService.dynamicFormItemsToControls(
        target.sectionItem.items
      );
      const formGroup: ExtendedFormGroup = new ExtendedFormGroup(
        childControls,
        target.sectionItem
      );
      target.push(formGroup);
    }
  }

  /**
   * REMOVE ITEM AT INDEX FROM FORM ARRAY WITH ID:
   * Removes the whole section or a form item within a section
   * @param key section key
   * @param info the id of the form item which should be removed and the index of where to remove it
   * @param sectionIndex if the formgroup is an array this is the index of the formgroup item
   */
  removeItemAtIndexFromFormArrayWithId(
    key: string,
    info?: { id: string; index: number },
    sectionIndex?: number
  ): void {
    if (info && info.id) {
      // There is info which means we want to remove a form item within a section
      if (sectionIndex > -1) {
        // the form control where the item to remove should be is an array
        const target: ExtendedFormArray = (this.extendedFormGroup.get(
          key
        ) as ExtendedFormGroupArray).at(sectionIndex) as ExtendedFormArray;
        (target.get(info.id) as ExtendedFormArray).removeAt(info.index);
      } else {
        // the form control is not an array since there is no section index
        (this.extendedFormGroup
          .get(key)
          .get(info.id) as ExtendedFormArray).removeAt(info.index);
      }
    } else {
      // there is no info indicating we should use the section index to remove the section itself
      if (sectionIndex > -1) {
        (this.extendedFormGroup.get(key) as ExtendedFormGroupArray).removeAt(
          sectionIndex
        );
      } else {
        console.warn(
          'Error at removeItemAtIndexFromFormArrayWithId: Tried to remove section but no section index was provided'
        );
      }
    }
  }

  removeItemFromParent(param: {
    form: ExtendedFormControl;
    index: number;
  }): void {
    const { form, index } = param;
    (form.formGroup as ExtendedFormGroupArray).removeAt(index);
    // reset parent control if the formGroup property doesn't have controls
    if (!(form.formGroup as ExtendedFormGroupArray).controls?.length) {
      form.reset();
    }
    this.followUpModalToggle = false;
  }

  editItemFromParent(param: {
    formArray: ExtendedFormArray;
    index: number;
    parentKey: string;
  }): void {
    const { formArray, index, parentKey } = param;

    this.newFormGroup = {
      form: new ExtendedFormGroup(
        (formArray.at(index) as ExtendedFormGroup)
          .controls as ExtendedFormGroupControls
      ),
      index,
      parentKey,
    };

    this.followUpModalToggle = true;
  }

  orderForm = (
    a: KeyValue<string, ExtendedFormGroup | ExtendedFormControl>,
    b: KeyValue<string, ExtendedFormGroup | ExtendedFormControl>
  ): number => {
    if (a.value['sectionItem'] && b.value['sectionItem']) {
      return (
        (a.value as ExtendedFormGroup).sectionItem.order -
        (b.value as ExtendedFormGroup).sectionItem.order
      );
    } else if (a.value['formItem'] && b.value['formItem']) {
      return (
        (a.value as ExtendedFormControl).formItem.order -
        (b.value as ExtendedFormControl).formItem.order
      );
    }
    return 0;
  };

  getFormArrayControls(
    control: ExtendedFormGroupArray
  ): Array<ExtendedFormGroup> {
    if (control instanceof ExtendedFormGroupArray) {
      return control.controls as Array<ExtendedFormGroup>;
    } else {
      console.warn(
        'Error in getFormArrayControls: control is not an instance of ExtendedFormGroupArray'
      );
      return [];
    }
  }

  controlValueChanged(): void {
    this.submitted &&= false;
  }

  get sectionList() {
    if (this.activeStep !== null) {
      return [
        this.extendedFormGroup.controls[
        Object.keys(this.extendedFormGroup.controls)[this.activeStep]
        ],
      ];
    } else {
      return this.extendedFormGroup.controls;
    }
  }

  validate(): void {
    console.log(this.extendedFormGroup);
  }

  cancel(): void {
    this.cancelEvent.emit();
  }

  next(): void {
    this.submitted = true;
    if (this.formService.validateForm(this.sectionList[0])) {
      this.confirmationData = this.hasConfirmation(this.sectionList[0].value);
      if (this.confirmationData) {
        this.confirmationToggle = true;
      } else {
        this.nextEvent?.emit();
        this.submitted = false;
      }
    }
  }

  /**
   * Find if the current selected values have a confirmation required
   * @param value the property value of formGroup
   */
  hasConfirmation(value: any): ConfirmInformation {
    let confirmation: ConfirmInformation = null;
    if (typeof value === 'object') {
      Object.keys(value).forEach((key: string) => {
        if (value[key]?.confirm) {
          confirmation = value[key].confirm;
        }
      });
    }
    return confirmation;
  }

  denyConfirmation(): void {
    this.confirmationToggle = false;
    this.confirmationData = null;
  }

  acceptConfirmation(): void {
    this.denyConfirmation();
    this.submitted = false;
    this.nextEvent?.emit();
  }

  previous(): void {
    this.previousEvent.emit();
  }
}

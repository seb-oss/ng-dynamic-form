import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ExtendedFormControl } from '../model/custom-classes/extended-form-control';
import { ExtendedFormArray } from '../model/custom-classes/extended-form-array';
import { DynamicFormType } from '../model/dynamicFormType';
import { isEmpty } from '@sebgroup/frontend-tools';
import { RuleType, Rule } from '../model/models';
import { FormService } from '../form.service';
import {
  ExtendedFormGroup,
  ExtendedFormGroupControl,
} from '../model/custom-classes/extended-form-group';
import { ValidatorFn } from '@angular/forms';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styles: [
    `
      ::ng-deep .dynamic-form-item {
        margin-bottom: 1.5rem;
      }

      ::ng-deep .dynamic-form-item-description {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class DynamicFormItemComponent implements OnInit {
  @Input() control: ExtendedFormControl | ExtendedFormArray;
  @Input() parentFormGroup: ExtendedFormGroup | ExtendedFormGroup[];
  @Input() sectionId: string;
  @Input() itemCustomClass: string = '';
  @Input() submitted: boolean = false;
  // used to compare current rules with saved data
  @Input() savedFormData: { key: string; value: string | number | boolean }[];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() textAreaTemplate: TemplateRef<any>;
  @Input() numberTemplate: TemplateRef<any>;
  @Input() checkboxTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;
  @Input() datePickerTemplate: TemplateRef<any>;
  @Input() radioTemplate: TemplateRef<any>;
  @Input() toggleSelectorTemplate: TemplateRef<any>;
  @Input() cardTemplate: TemplateRef<any>;
  @Input() disclaimerTemplate: TemplateRef<any>;
  @Output() createFormGroup: EventEmitter<any> = new EventEmitter();
  @Output() itemAddedClicked: EventEmitter<string> = new EventEmitter();
  @Output() itemRemovedClicked: EventEmitter<{
    id: string;
    index: number;
  }> = new EventEmitter();
  @Output() controlValueChanged: EventEmitter<boolean> = new EventEmitter();
  controlType = DynamicFormType;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.control && this.setRules();
    this.control.valueChanges?.subscribe((valueChange: any) => {
      this.controlValueChanged.emit(true);
      if (valueChange?.followUpItems?.items?.length) {
        if (valueChange.followUpItems.type === 'modal') {
          delete (this.control as ExtendedFormControl).formGroup;
          this.createFormGroup.emit({
            items: valueChange?.followUpItems?.items,
            key: this.control.formItem.key,
          });
        } else {
          (this.control as ExtendedFormControl).formGroup =
            this.formService.dynamicFormItemsToFormGroup(
              valueChange?.followUpItems?.items
            );
        }
      } else {
        delete (this.control as ExtendedFormControl).formGroup;
      }
    });
  }

  setRules(): void {
    let validator: ValidatorFn[];

    const rule = this.control?.formItem?.rules?.find(
      (rule: Rule) =>
        rule.type === RuleType.minThanReference ||
        rule.type === RuleType.minThanEqualsReference ||
        rule.type === RuleType.maxThanReference ||
        rule.type === RuleType.maxThanEqualReference
    );
    if (rule) {
      if (this.savedFormData.length) {
        const referenceValue: {
          key: string;
          value: string | number | boolean;
        } = this.savedFormData.find(
          (savedData: { key: string; value: string | number | boolean }) =>
            savedData.key === rule.value
        );
        if (referenceValue) {
          ({ validator } = this.formService.appendValidations(
            rule,
            null,
            referenceValue
          ));
        }
      } else if (
        this.formService.findNestedControl(this.parentFormGroup, rule.value)
      ) {
        const referenceControl: ExtendedFormGroupControl =
          this.formService.findNestedControl(this.parentFormGroup, rule.value);
        ({ validator } = this.formService.appendValidations(
          rule,
          referenceControl
        ));
      }
      validator &&
        this.control.setValidators([this.control.validator, ...validator]);
      this.control.updateValueAndValidity();
    }
  }

  get formArrayControls(): ExtendedFormArray['controls'] {
    if (this.control instanceof ExtendedFormArray) {
      return this.control.controls;
    } else {
      console.warn(
        'Error in getFormArrayControls: control is not an instance of ExtendedFormArray'
      );
      return [];
    }
  }

  get error(): string {
    if (this.submitted) {
      if (this.control?.errors && !isEmpty(this.control.errors)) {
        const errorObjKey: string = Object.keys(this.control.errors)[0];
        switch (errorObjKey) {
          case 'min':
            return (
              this.control.formItem.rules.find(
                (rule: Rule) =>
                  rule.type === RuleType.min ||
                  rule.type === RuleType.minThanEqualsReference ||
                  rule.type === RuleType.minThanReference
              )?.message +
              ` ${
                this.control.errors?.min?.min
                  ? formatNumber(this.control.errors?.min?.min, 'se')
                  : ''
              }`
            );
          case 'max':
            return (
              this.control.formItem.rules.find(
                (rule: Rule) =>
                  rule.type === RuleType.max ||
                  rule.type === RuleType.maxThanEqualReference ||
                  rule.type === RuleType.maxThanReference
              )?.message +
              ` ${
                this.control.errors?.max?.max
                  ? formatNumber(this.control.errors?.max?.max, 'se')
                  : ''
              }`
            );
          case 'minlength':
            return this.control.formItem.rules.find(
              (rule: Rule) => rule.type === RuleType.minLength
            )?.message;
          case 'maxlength':
            return this.control.formItem.rules.find(
              (rule: Rule) => rule.type === RuleType.maxLength
            )?.message;
          case 'required':
            return this.control.formItem.rules.find(
              (rule: Rule) => rule.type === RuleType.required
            )?.message;
          default:
            break;
        }
      } else {
        this.control && this.setRules();
      }
    }
  }

  makeId(info?: string, index?: number): string {
    return `${this.sectionId}-${this.control.formItem.key}-${
      this.control.formItem.controlType
    }${info ? `-${info}` : '' + index ? `-${index}` : ''}`;
  }

  get hasTemplate(): boolean {
    switch (this.control?.formItem.controlType) {
      case this.controlType.TextArea:
        return !!this.textAreaTemplate;
      case this.controlType.Number:
        return !!this.numberTemplate;
      case this.controlType.Checkbox:
        return !!this.checkboxTemplate;
      case this.controlType.Dropdown:
        return !!this.dropdownTemplate;
      case this.controlType.Datepicker:
        return !!this.datePickerTemplate;
      case this.controlType.Card:
        return !!this.cardTemplate;
      case this.controlType.Radio:
        return !!this.radioTemplate;
      case this.controlType.Disclaimer:
        return !!this.disclaimerTemplate;
      default:
        return false;
    }
  }
}

import { formatNumber } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DynamicFormSection,
  FormService,
  ExtendedFormGroup,
  DynamicFormComponent,
} from 'projects/dynamic-form/src/lib';
import { IFormAction } from 'projects/dynamic-form/src/lib/i-form-action.enum';

@Component({
  selector: 'storybook-dynamic-form',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.scss'],
})
export class DemoComponent implements OnInit, OnChanges {
  extendedFormGroup: ExtendedFormGroup;
  @ViewChild('dynamicForm') dynamicForm: DynamicFormComponent;
  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
      this.formSection[this.activeStep],
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void { }

  @Input()
  activeStep: number;

  @Input()
  formSection: DynamicFormSection[];

  @Input()
  hasFormActions: boolean;

  @Input()
  nextAction: IFormAction = { hasAction: false, label: 'Next' };

  @Input()
  previousAction: IFormAction = { hasAction: false, label: 'Previous' };

  @Input()
  cancelAction: IFormAction = { hasAction: false, label: 'Cancel' };

  @Input()
  saveAction: IFormAction = { hasAction: false, label: 'Save' };

  goToNextStep(): void {
    this.activeStep += 1;
    this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(
      [this.formSection[this.activeStep]],
      this.extendedFormGroup
    );
  }

  gotToPreviousStep(): void {
    this.activeStep -= 1;
  }

  getObjectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }

  edit(param): void {
    this.dynamicForm.editItemFromParent(param);
  }

  delete(param): void {
    this.dynamicForm.removeItemFromParent(param);
  }

  getNestedControlValue(control): string[] {
    return Object.values(Object.values(control)[0]);
  }

  formatNumberLocale(value): string {
    return Number(value) ? formatNumber(value, 'se') : value;
  }
}

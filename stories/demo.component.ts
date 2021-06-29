import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  DynamicFormSection,
  FormService,
  ExtendedFormGroup,
} from 'dynamic-form';
import { IFormAction } from 'projects/dynamic-form/src/lib';

@Component({
  selector: 'storybook-dynamic-form',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.scss'],
})
export class DemoComponent implements OnInit, OnChanges {
  extendedFormGroup: ExtendedFormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup([
      this.formSection[this.activeStep],
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.formSection.currentValue) {
    //   this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(
    //     this.formSection
    //   );
    // }
  }

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
}

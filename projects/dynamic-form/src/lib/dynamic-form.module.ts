import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CheckboxModule,
  RadioGroupModule,
  TextboxModule,
  DatepickerModule,
  DropdownModule,
  StepperModule,
  TextareaModule,
  ModalModule,
  ToggleSelectorModule,
  VideoModule,
  ButtonModule,
} from '@sebgroup/ng-components';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormItemComponent } from './dynamic-form-item/dynamic-form-item.component';
import { DynamicFormModalComponent } from './dynamic-form-modal/dynamic-form-modal.component';
import { DynamicFormDataComponent } from './dynamic-from-data/dynamic-form-data.component';
import { DynamicFormMediaComponent } from './dynamic-form-media/dynamic-form-media.component';
import { SafePipeModule } from './pipes/safe.pipe';
import { DigitOnlyModule } from './digit-only/digit-only.directive';
import localeSe from '@angular/common/locales/se';
import { DynamicFormConfirmationComponent } from './dynamic-form-confirmation/dynamic-form-confirmation.component';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { ControlRenderPipe } from './pipes/control-render.pipe';
import { FollowUpControlTypePipe } from './pipes/followup-control-type.pipe';
import { DynamicFormItemDirective } from './dynamic-form-item/dynmic-form-item.directive';
import { DynamicFormSectionComponent } from './dynamic-form-section/dynamic-form-section.component';
import { DynamicFormDirective } from './dynamic-form.directive';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';

registerLocaleData(localeSe);

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormSectionComponent,
    DynamicFormItemComponent,
    DynamicFormModalComponent,
    DynamicFormDatepickerComponent,
    DynamicFormDataComponent,
    DynamicFormMediaComponent,
    DynamicFormConfirmationComponent,
    DynamicFormDirective,
    ObjectKeysPipe,
    ControlRenderPipe,
    FollowUpControlTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,
    RadioGroupModule,
    TextboxModule,
    TextareaModule,
    DatepickerModule,
    StepperModule,
    ModalModule,
    ToggleSelectorModule,
    VideoModule,
    ButtonModule,
    SafePipeModule,
    DigitOnlyModule,
  ],
  exports: [
    // COMPONENTS
    DynamicFormComponent,
    DynamicFormSectionComponent,
    DynamicFormItemComponent,
    DynamicFormModalComponent,
    DynamicFormDataComponent,
    DynamicFormMediaComponent,
    DynamicFormConfirmationComponent,
    // MODULES
    DropdownModule,
    CheckboxModule,
    RadioGroupModule,
    TextareaModule,
    DatepickerModule,
    StepperModule,
    ModalModule,
    ToggleSelectorModule,
    VideoModule,
    ButtonModule,
    DigitOnlyModule,
  ],
  bootstrap: [DynamicFormItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormModule {}

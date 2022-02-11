import { DatepickerComponent } from "@sebgroup/ng-components/lib/datepicker";
import { RadioGroupComponent } from "@sebgroup/ng-components/lib/radio-group";
import { TextareaComponent } from "@sebgroup/ng-components/lib/textarea";
import { TextboxComponent } from "@sebgroup/ng-components/lib/textbox";
import { ToggleComponent } from "@sebgroup/ng-components/lib/toggle";
import { DynamicFormSectionComponent } from "../components/dynamic-form-section/dynamic-form-section/dynamic-form-section.component";

export interface DynamicFormTextbox extends TextboxComponent {
  controlType: "Text";
}

export interface DynamicFormTextarea extends TextareaComponent {
  controlType: "TextArea";
}

export interface DynamicFormRadioGroup extends RadioGroupComponent {
  controlType: "Radio";
}

export interface DynamicFormToggle extends ToggleComponent {
  controlType: "ToggleSelector";
}

export interface DynamicDatepicker extends DatepickerComponent {
  controlType: "Datepicker";
}

export interface DynamicFormSection<T> extends Omit<DynamicFormSectionComponent<T>, 'name'>, CommonFieldProp<T> {
  controlType: "Section";
}

export type CommonFieldProp<T> = {
  validations?: any;
  name: keyof T;
  multi?: boolean;
};

export type FieldWithValue<T> = CommonFieldProp<T> & (DynamicFormTextbox | DynamicFormTextarea | DynamicFormToggle);

export type DynamicFormField<T> = FieldWithValue<T> | DynamicFormSection<T>;

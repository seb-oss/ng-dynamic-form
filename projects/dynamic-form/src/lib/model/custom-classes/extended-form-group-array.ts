import { FormArray } from "@angular/forms";
import { DynamicFormSectionO } from "../../model/dynamicFormSection";
import { ExtendedFormGroup } from "./extended-form-group";

export class ExtendedFormGroupArray extends FormArray {
    sectionItem: DynamicFormSectionO;

    constructor(controls: Array<ExtendedFormGroup>, item?: DynamicFormSectionO) {
        super(controls);
        this.sectionItem = item;
    }
}

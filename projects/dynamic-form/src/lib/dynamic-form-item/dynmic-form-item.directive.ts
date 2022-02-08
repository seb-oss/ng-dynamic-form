import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicFormItem]',
})
export class DynamicFormItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

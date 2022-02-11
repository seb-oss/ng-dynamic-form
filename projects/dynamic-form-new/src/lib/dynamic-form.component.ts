import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormField } from './models';

@Component({
  selector: 'ng-dynamic-form',
  template: `
    <p>
      dynamic-form works!
    </p>
  `,
  styles: [
  ]
})
export class DynamicFormComponent<T> implements OnInit {
  @Input()
  fields: DynamicFormField<T>[];
  
  constructor() { }

  ngOnInit(): void {
  }

}

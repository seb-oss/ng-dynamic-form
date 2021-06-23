import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmInformation } from '../model/models';

@Component({
  selector: 'app-dynamic-form-confirmation',
  templateUrl: './dynamic-form-confirmation.component.html',
  styleUrls: ['./dynamic-form-confirmation.component.css'],
})
export class DynamicFormConfirmationComponent {
  @Input() confirmationToggle: boolean;
  @Input() confirmationData: ConfirmInformation;

  @Output() acceptConfirmationEvent: EventEmitter<void> = new EventEmitter();
  @Output() denyConfirmationEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  denyConfirmation(): void {
    this.denyConfirmationEvent.emit();
  }

  acceptConfirmation(): void {
    this.acceptConfirmationEvent.emit();
  }
}

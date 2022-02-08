import {
  ComponentFactoryResolver,
  Directive,
  Input,
  ViewContainerRef,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
  Host,
  Inject,
  Optional,
  Self,
  SkipSelf,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlContainer,
  Form,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CheckboxComponent,
  DatepickerComponent,
  RadioGroupComponent,
  TextareaComponent,
  ToggleSelectorComponent,
} from '@sebgroup/ng-components';
import { TextboxComponent } from '@sebgroup/ng-components/lib/textbox';
import { Subscription } from 'rxjs';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';
import { DynamicFormSectionComponent } from './dynamic-form-section/dynamic-form-section.component';
import { DynamicFormField, DynamicFormType } from './model/models';

export function normalizeValidator(
  validator: ValidatorFn | Validator
): ValidatorFn {
  if ((<Validator>validator).validate) {
    return (c: AbstractControl) => (<Validator>validator).validate(c);
  } else {
    return <ValidatorFn>validator;
  }
}

@Directive({
  selector: '[dynamicField]',
})
export class DynamicFormDirective<T>
  extends NgControl
  implements OnInit, OnDestroy {
  @Input()
  field: DynamicFormField<T>;

  @Input()
  group: FormGroup;

  @Output()
  eventEm = new EventEmitter();

  @Output('ngModelChange') update = new EventEmitter();

  private _control: FormControl | FormGroup;
  private componentRef: any;
  private event$: Subscription;

  get path(): string[] {
    return [...this.parent.path!, this.name as string];
  }

  get formDirective(): Form {
    return this.parent ? this.parent.formDirective : null;
  }

  get control(): FormControl | FormGroup {
    return this._control;
  }

  get validator(): ValidatorFn | null {
    return this.validators != null
      ? Validators.compose(this.validators.map(normalizeValidator))
      : null;
  }

  get asyncValidator(): AsyncValidatorFn {
    return null;
  }

  viewToModelUpdate(newValue: any): void {
    this.update.emit(newValue);
  }

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    @Optional()
    @Self()
    @Inject(NG_VALIDATORS)
    private validators: Array<Validator | ValidatorFn>,
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
    super();
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(
      this.getComponent(this.field.controlType) as any
    );
    this.name = this.field.name as string;

    this.componentRef = this.container.createComponent(factory);
    Object.keys(this.field).map((item: string) => {
      this.componentRef.instance[item] = this.field[item];
    });
    this.componentRef.instance.formGroup = this.group;
    this.valueAccessor = this.componentRef.instance;
    const ngValidators = this.componentRef.injector.get(NG_VALIDATORS, null);
    if (
      ngValidators &&
      ngValidators.some((x) => x === this.componentRef.instance)
    ) {
      this.validators = [
        ...(this.validators || []),
        ...(ngValidators as Array<Validator | ValidatorFn>),
      ];
    }
    if (this.field.controlType === 'Section') {
      this.formDirective.addFormGroup(this as any);
    } else {
      this.formDirective.addControl(this);
    }
    this._control = this.group.get(this.field.name as string) as any;
  }

  ngOnDestroy() {
    if (this.event$) {
      this.event$.unsubscribe();
    }
  }

  getComponent(controlType: DynamicFormType) {
    switch (controlType) {
      case 'Section':
        return DynamicFormSectionComponent;
      case 'Radio':
        return RadioGroupComponent;
      case 'Checkbox':
        return CheckboxComponent;
      case 'Datepicker':
        return DynamicFormDatepickerComponent;
      case 'TextArea':
        return TextareaComponent;
      case 'ToggleSelector':
        return ToggleSelectorComponent;
      default:
        return TextboxComponent;
    }
  }
}

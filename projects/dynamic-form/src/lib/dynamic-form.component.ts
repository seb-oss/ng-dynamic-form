import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormField } from '.';
import { DynamicFormControlService } from './dynamic-form-control.service';

const checkboxField = 'checkbox';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [DynamicFormControlService],
  styles: [],
})
export class DynamicFormComponent<T>
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() templates: any;
  @Input() fields: DynamicFormField<T>[] = [];
  @Input() isSubForm?: boolean = false;
  @Input() parentFormGroup?: FormGroup;
  @Input() groupName?: keyof T;
  @Input()
  set setData(value) {
    this.data = value;
    if (this.form) {
      this.form.setValue(value);
      this.form.markAsDirty();
    }
  }
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  private data: any;
  private value$: Subscription;

  get value() {
    return this.form.value;
  }

  constructor(
    private dynamicFormControlService: DynamicFormControlService<T>
  ) {}

  ngOnInit(): void {
    this.form = this.dynamicFormControlService.buildForm(this.fields);
  }

  ngAfterViewInit() {
    // console.log(this.contentChildren);
    // const scrollToField = this.appState.get(scrollToEl);
    // if( scrollToField ) {
    //   const el = document.getElementById(scrollToField);
    //   if(el)
    //     el.scrollIntoView(false);
    // }
  }

  ngOnDestroy() {
    if (this.value$) {
      this.value$.unsubscribe();
    }
    // this.appState.set(scrollToEl, null);
  }

  fieldOutputEv(e) {}

  /**
   * on form submit event
   * @param event
   */
  onSubmit(event: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(this.form)
    // const isValid = this.form.valid && this.checkSubControlFields();
    // if (isValid) {
    this.submit.emit(this.form.value);
    // } else {
    // this.validateAllFormFields(this.form, this.fields);
    // }
  }
}

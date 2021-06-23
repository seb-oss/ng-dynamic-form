import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormConfirmationComponent } from './dynamic-form-confirmation.component';

describe('DynamicFormConfirmationComponent', () => {
  let component: DynamicFormConfirmationComponent;
  let fixture: ComponentFixture<DynamicFormConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

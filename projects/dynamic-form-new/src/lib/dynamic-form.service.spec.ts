import { TestBed } from '@angular/core/testing';

import { DynamicFormNewService } from './dynamic-form.service';

describe('DynamicFormNewService', () => {
  let service: DynamicFormNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

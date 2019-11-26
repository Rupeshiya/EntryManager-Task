import { TestBed } from '@angular/core/testing';

import { CheckServiceService } from './check-service.service';

describe('CheckServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckServiceService = TestBed.get(CheckServiceService);
    expect(service).toBeTruthy();
  });
});

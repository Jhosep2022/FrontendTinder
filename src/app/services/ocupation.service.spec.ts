import { TestBed } from '@angular/core/testing';

import { OccupationService } from './ocupation.service';

describe('OcupationService', () => {
  let service: OccupationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

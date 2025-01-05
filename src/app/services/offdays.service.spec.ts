import { TestBed } from '@angular/core/testing';

import { OffdaysService } from './offdays.service';

describe('OffdaysService', () => {
  let service: OffdaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffdaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AbsenseService } from './absense.service';

describe('AbsenseService', () => {
  let service: AbsenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BaseApiUrlService } from './base-api-url.service';

describe('BaseApiUrlService', () => {
  let service: BaseApiUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseApiUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

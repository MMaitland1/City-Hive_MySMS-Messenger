import { TestBed } from '@angular/core/testing';

import { RubyApiService } from './ruby-api.service';

describe('RubyApiService', () => {
  let service: RubyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

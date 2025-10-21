import { TestBed } from '@angular/core/testing';

import { SignalBusService } from './signal-bus.service';

describe('SignalBusService', () => {
  let service: SignalBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { IsLoggedGuardService } from './enter-details-guard.service';

describe('EnterDetailsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedGuardService]
    });
  });

  it('should be created', inject([IsLoggedGuardService], (service: IsLoggedGuardService) => {
    expect(service).toBeTruthy();
  }));
});

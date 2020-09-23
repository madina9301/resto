import { TestBed } from '@angular/core/testing';

import { CammandeService } from './cammande.service';

describe('CammandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CammandeService = TestBed.get(CammandeService);
    expect(service).toBeTruthy();
  });
});

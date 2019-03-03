import { TestBed } from '@angular/core/testing';

import { KonguService } from './kongu.service';

describe('KonguService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KonguService = TestBed.get(KonguService);
    expect(service).toBeTruthy();
  });
});

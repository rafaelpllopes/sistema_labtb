import { TestBed } from '@angular/core/testing';

import { RelatoriosService } from './relatorios.service';

describe('RelatoriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelatoriosService = TestBed.get(RelatoriosService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CandidateService } from './candidate.service';

describe('CandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    
  }));

  it('should be created', () => {
    const service: CandidateService = TestBed.get(CandidateService);
    expect(service).toBeTruthy();
  });
});

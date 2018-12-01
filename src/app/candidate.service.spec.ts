import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';

import { CandidateService } from './candidate.service';
import { Candidate } from './candidate';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('CandidateService', () => {
  let service: CandidateService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CandidateService(<any> httpClientSpy);
  });

  it('should be created', () => {
    const service: CandidateService = TestBed.get(CandidateService);
    expect(service).toBeTruthy();
  });

  it('should return expected jobs (HttpClient called once)', () => {
    const expectedCandidates: Candidate[] = [{
      candidateId: 1,
      name: 'Luke Skywalker',
      skillTags: 'a, b, c'
    }];

    httpClientSpy.get.and.returnValue(asyncData(expectedCandidates));

    service.getCandidates().subscribe(
      jobs => expect(jobs).toEqual(expectedCandidates, 'expected candidates'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    // service fails 404 gracefully by returning empty array
    service.getCandidates().subscribe(
      jobs => expect(jobs).toEqual([]),
      error  => expect(error).toEqual([])
    );
  });
});

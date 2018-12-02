import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';

import { JobService } from './job.service';
import { Job } from './job';
import { ErrorHandlerService } from './error-handler.service';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('JobService', () => {
  let service: JobService;
  let httpClientSpy: { get: jasmine.Spy };
  let errorService: ErrorHandlerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new JobService(<any> httpClientSpy, errorService);
    errorService = new ErrorHandlerService();
  });

  it('should be created', () => {
    const service: JobService = TestBed.get(JobService);
    expect(service).toBeTruthy();
  });

  it('should return expected jobs (HttpClient called once)', () => {
    const expectedJobs: Job[] = [{
      jobId: 1,
      name: 'traveller',
      company: 'AirrrrBnb',
      skills: 'a, b, c',
      topCandidates: []
    }];

    httpClientSpy.get.and.returnValue(asyncData(expectedJobs));

    service.getJobs().subscribe(
      jobs => expect(jobs).toEqual(expectedJobs, 'expected jobs'),
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
    service.getJobs().subscribe(
      jobs => expect(jobs).toEqual([]),
      error  => expect(error).toEqual([])
    );
  });

});

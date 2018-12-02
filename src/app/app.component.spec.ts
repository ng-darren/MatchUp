import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

import { CandidateService } from './candidate.service';
import { Candidate } from './candidate';
import { JobService } from './job.service';

describe('AppComponent', () => {
  let getCandidatesSpy, getJobsSpy;

  beforeEach(async(() => {
    const candidateService = jasmine.createSpyObj('CandidateService', ['getCandidates']);
    const jobService = jasmine.createSpyObj('JobService', ['getJobs']);
    const testCandidates: Candidate[] = [{
      candidateId: 1,
      name: 'Luke Skywalker',
      skillTags: 'admin, b, c'
    }];
    const testJobs: any[] = [{
      jobId: 1,
      name: 'traveller',
      company: 'AirrrrBnb',
      skills: 'admin, b, c, d, e'
    }];

    getCandidatesSpy = candidateService.getCandidates.and.returnValue( of(testCandidates) );
    getJobsSpy = jobService.getJobs.and.returnValue( of(testJobs) );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
      providers:    [
        { provide: CandidateService, useValue: candidateService },
        { provide: JobService, useValue: jobService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'matchUp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Match Up');
  });

  it('should render title in a h3 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Welcome to Match Up!');
  });

  it('should get candidates and jobs in ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.candidates).toEqual({
      1: {
        candidateId: 1,
        name: 'Luke Skywalker',
        skillTags: 'admin, b, c'
      }
    });

    expect(fixture.componentInstance.jobs).toEqual([{
      jobId: 1,
      name: 'traveller',
      company: 'AirrrrBnb',
      skills: 'admin, b, c, d, e',
      topCandidates: [1]
    }]);
  });

  it('should create skillSet object', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.skillSet).toEqual({
      admin: [1],
      b: [1],
      c: [1]
    });
  });

  it('should filter top candidates in jobs', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.skillSet).toEqual({
      admin: [1],
      b: [1],
      c: [1]
    });

    fixture.detectChanges(); // update view

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card').textContent).toContain('AirrrrBnb');
    expect(compiled.querySelector('table').textContent).toContain('Luke Skywalker');
  });
});

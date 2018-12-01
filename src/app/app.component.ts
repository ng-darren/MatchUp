import { Component, OnInit } from '@angular/core';

import { Job } from './job';
import { Candidate } from './candidate';

import { CandidateService } from './candidate.service';
import { JobService } from './job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Match Up';
  jobs: Job[] = [];
  candidates: Candidate[] = [];

  constructor(
    private candidateService: CandidateService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.getJobs();
    this.getCandidates();
  }

  getJobs = (): void => {
    this.jobService.getJobs()
    .subscribe(jobs => this.jobs = jobs);
  }

  getCandidates = (): void => {
    this.candidateService.getCandidates()
    .subscribe(candidates => this.candidates = candidates);
  }
}

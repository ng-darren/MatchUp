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
  title: string = 'Match Up';
  jobs: Job[] = [];
  candidates: any = {};
  skillSet: {} = {};

  constructor(
    private candidateService: CandidateService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.getCandidates();
  }

  getJobs = (): void => {
    this.jobService.getJobs()
      .subscribe(jobs => {
        this.jobs = this.findTopCandidates(jobs);
      });
  }

  getCandidates = (): void => {
    this.candidateService.getCandidates()
      .subscribe(candidates => {
        this.candidates = this.createCandidates(candidates);
        this.skillSet = this.createSkillSet(candidates);
        this.getJobs();
      });
  }

  /** Create candidates object */
  private createCandidates = (candidates: Candidate[]): any => {
    let candidatesSet = {};
    candidates.forEach(candidate => {
      candidatesSet[candidate.candidateId] = candidate;
    });

    return candidatesSet;
  }

  /** Create skill set object
      Example: skillList = {'reliable': [1,2,44,67,89], 'sales': [2,34,56,78,103]]} */
  private createSkillSet = (candidates) => {
    let skillSet = {};
    candidates.forEach(candidate => {
      let skills: string[] = candidate.skillTags.split(', ');
      skills.forEach(skill => {
        if (skillSet[skill]) {
          // do not add candidate if candidate already exist in skillSet
          if (skillSet[skill].indexOf(candidate.candidateId) === -1) {
            skillSet[skill].push(candidate.candidateId);
          }
        } else {
          skillSet[skill] = [candidate.candidateId];
        }
      });
    });

    return skillSet;
  }

  /** Find top candidate
      Within each job, retrieve candidate Ids from skill set object and create
      object to count Ids (key is the candidate Id and value is count).
      Example: {1: 2, 45: 2, 67: 4}.
      At the same time, maintain a variable for skill matched count and a
      topCandidates array to hold the candidate Ids with the most skills matched.
      This also offers a time complexity of O(N) */
  private findTopCandidates = (jobs: Job[]): Job[]  => {
    jobs.forEach(job => {
      let topMatchedCount: number = 0, skills: string[] = job.skills.split(', ');
      job.topCandidates = []; // initialise topCandidates
      let candidateSkillMatchedCount = {};

      skills.forEach(skill => {
        if (this.skillSet[skill]) {
          this.skillSet[skill].forEach(candidateId => {
            if (candidateSkillMatchedCount[candidateId]) {
              candidateSkillMatchedCount[candidateId]++;

              if (topMatchedCount < candidateSkillMatchedCount[candidateId]) {
                topMatchedCount = candidateSkillMatchedCount[candidateId];
                job.topCandidates = [candidateId];
              } else if (topMatchedCount === candidateSkillMatchedCount[candidateId]){
                job.topCandidates.push(candidateId);
              }
            } else {
              candidateSkillMatchedCount[candidateId] = 1;
            }
          })
        } else {
          // no one has the skill
          console.log('no one has ', skill);
        }
      })
    });

    return jobs;
  }
}

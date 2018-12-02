# Match Up

A web application that will help a recruiter automatically match candidates to open jobs. It displays a candidate that is the most-qualified to fill that job for each
job within the UI.

## Assumptions

- Unique candidate Id
- Speed is more important than space

## What Happens Within the App
1) GET candidates using API and store candidates
2) Sort candidates into object and arrays (almost like Hashtable) with skillTags as key and Candidate Ids as values. Example: skillList = {'reliable': [1,2,44,67,89], 'sales': [2,34,56,78,103]]} This takes a time complexity of O(N)
3) GET jobs using API
4) Within each job, retrieve candidate Ids from object created in (2) and create object to count Ids (key is the candidate Id and value is count). Example: {1: 2, 45: 2, 67: 4}. At the same time, maintain a variable for skill matched count and a topCandidates array to hold the candidate Ids with the most skills matched. This also offers a time complexity of O(N)
5) Retrieve the best candidate information from candidate store using topCandidateId and display candidate information

## Note
Built with Angular 7.1.0
Uses Bootstrap CSS from CDN to make things prettier

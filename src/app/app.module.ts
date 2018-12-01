import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { JobService } from './job.service';
import { CandidateService } from './candidate.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    HttpClientModule,
    JobService,
    CandidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string[] = [];

  constructor() { }

  complain = (message: string) => {
    this.errorMessage.push(message);
  }

  clearMessage = () => {
    this.errorMessage = [];
  }
}

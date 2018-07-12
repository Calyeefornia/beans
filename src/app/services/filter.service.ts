import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {

  private statusSource = new BehaviorSubject('');
  currentStatus = this.statusSource.asObservable();

  constructor() { }

  changeStatus(message: string) {
    this.statusSource.next(message);
  }

}

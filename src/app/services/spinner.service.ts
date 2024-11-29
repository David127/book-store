import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isLoadingBs = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingBs.asObservable();

  hide() {
    this.isLoadingBs.next(false);
  }

  show() {
    this.isLoadingBs.next(true);
  }

}

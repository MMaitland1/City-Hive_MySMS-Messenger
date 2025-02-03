// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private reloadComponentSource = new Subject<void>();
  reloadComponent$ = this.reloadComponentSource.asObservable();

  reloadComponent(): void {
    this.reloadComponentSource.next();
  }
}
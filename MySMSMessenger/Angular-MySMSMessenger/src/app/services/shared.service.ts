// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Mark the service as injectable, which allows it to be injected into other components or services
@Injectable({
  providedIn: 'root' // This makes the service available globally in the application
})
export class SharedService {

  // Create a private Subject that will be used to send signals (void messages)
  private reloadComponentSource = new Subject<void>();

  // Observable that other components can subscribe to in order to listen for the reload signal
  reloadComponent$ = this.reloadComponentSource.asObservable();

  // Method to trigger the reload signal by emitting a value through the Subject
  reloadComponent(): void {
    // Call the next method to send out the signal
    this.reloadComponentSource.next();
  }
}

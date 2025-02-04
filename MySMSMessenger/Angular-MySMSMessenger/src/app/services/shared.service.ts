import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Importing Subject from rxjs to handle events

@Injectable({
  providedIn: 'root' // Make this service available globally within the Angular application
})
export class SharedService {

  // Subject to handle component reload events
  // reloadComponentSource is a private Subject which emits void (no value) to notify components to reload
  private reloadComponentSource = new Subject<void>();

  // Observable that components can subscribe to in order to listen for reload events
  // reloadComponent$ is the observable counterpart for reloadComponentSource
  reloadComponent$ = this.reloadComponentSource.asObservable();

  // Subject to handle title update events
  // updateTitleSource is a private Subject which emits a string (new title)
  private updateTitleSource = new Subject<string>();

  // Observable that components can subscribe to in order to listen for title updates
  // updateTitle$ is the observable counterpart for updateTitleSource
  updateTitle$ = this.updateTitleSource.asObservable();

  // Method to trigger a reload event for components subscribing to reloadComponent$
  // Calling this will emit a value (void) to notify subscribers (e.g., MessagesComponent) to reload
  reloadComponent(): void {
    this.reloadComponentSource.next(); // Emit void to notify subscribers
  }

  // Method to trigger a title update event for components subscribing to updateTitle$
  // This method accepts a string (newTitle) and emits it to notify subscribers to update the title
  updateTitle(newTitle: string): void {
    this.updateTitleSource.next(newTitle); // Emit the new title to subscribers
  }
}

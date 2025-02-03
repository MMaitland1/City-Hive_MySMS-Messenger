import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root' // This makes the service available globally across the application
})
export class SessionService {
  
  private storageKey = 'userSession'; // The key used to store session data in localStorage

  constructor() {}

  // Check if localStorage is available in the current environment (i.e., browser)
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Save session data as a User object in localStorage
  setSessionData(user: User): void {
    if (this.isLocalStorageAvailable()) {
      // Convert the User object to a string and save it in localStorage under the storageKey
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  // Retrieve session data as a User object from localStorage
  getSessionData(): User | null {
    if (!this.isLocalStorageAvailable()) {
      // Return null if localStorage is not available
      return null;
    }
    const userData = localStorage.getItem(this.storageKey); // Retrieve the stored user data
    // If data is found, parse it as a User object, otherwise return null
    return userData ? JSON.parse(userData) as User : null;
  }

  // Check if session data exists in localStorage
  hasSessionData(): boolean {
    return this.getSessionData() !== null; // If data is found, return true, otherwise false
  }

  // Clear session data from localStorage on logout
  clearSessionData(): void {
    if (this.isLocalStorageAvailable()) {
      // Remove the session data from localStorage using the storageKey
      localStorage.removeItem(this.storageKey);
    }
  }
}

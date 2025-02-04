import { Injectable } from '@angular/core';
import { User } from '../models/User'; // Import the User model

@Injectable({
  providedIn: 'root' // This makes the service available globally across the application
})
export class SessionService {
  
  private storageKey = 'userSession'; // The key used to store session data in localStorage

  constructor() {}

  // Check if localStorage is available in the current environment (i.e., browser)
  private isLocalStorageAvailable(): boolean {
    // Ensure the window object and localStorage are available (important for server-side rendering)
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Save session data as a User object in localStorage
  setSessionData(user: User): void {
    if (this.isLocalStorageAvailable()) {
      // Convert the User object to a string using JSON.stringify() and save it in localStorage under the storageKey
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  // Retrieve session data as a User object from localStorage
  getSessionData(): User | null {
    if (!this.isLocalStorageAvailable()) {
      // If localStorage is not available (e.g., when running in a non-browser environment), return null
      return null;
    }
    const userData = localStorage.getItem(this.storageKey); // Retrieve the stored user data from localStorage
    // If data is found, parse it as a User object, otherwise return null
    return userData ? JSON.parse(userData) as User : null;
  }

  // Check if session data exists in localStorage
  hasSessionData(): boolean {
    // Returns true if session data exists (i.e., the user is logged in), otherwise returns false
    return this.getSessionData() !== null;
  }

  // Clear session data from localStorage on logout
  clearSessionData(): void {
    if (this.isLocalStorageAvailable()) {
      // Remove the session data from localStorage using the storageKey
      localStorage.removeItem(this.storageKey);
    }
  }
}

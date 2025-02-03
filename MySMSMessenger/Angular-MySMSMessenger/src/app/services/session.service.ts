import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private storageKey = 'userSession';

  constructor() {}

  // ✅ Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ✅ Save session data as a User object
  setSessionData(user: User): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  // ✅ Retrieve session data as a User object
  getSessionData(): User | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) as User : null;
  }

  // ✅ Check if session exists
  hasSessionData(): boolean {
    return this.getSessionData() !== null;
  }

  // ✅ Clear session on logout
  clearSessionData(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}

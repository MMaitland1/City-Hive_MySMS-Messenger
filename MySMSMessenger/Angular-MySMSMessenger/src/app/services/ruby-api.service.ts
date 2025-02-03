import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { CacheService } from '../services/CacheService';
import { SharedService } from './shared.service'; // Import the SharedService

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RubyApiService {
  private apiUrl = 'http://localhost:3000';
 

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private sharedService: SharedService // Inject the SharedService
  ) {}

  // Helper method for cached GET requests
  private cachedGet<T>(url: string, processFn: (response: any) => T): Observable<T> {
    const cacheKey = `GET:${url}`;
    const cached = this.cacheService.get(cacheKey);
    
    if (cached) {
      return of(cached).pipe(
        tap(() => this.fetchAndUpdateCache(url, cacheKey, processFn))
      );
    }
    
    return this.http.get<any>(url).pipe(
      map(processFn),
      tap(data => this.cacheService.set(cacheKey, data))
    );
  }



  private fetchAndUpdateCache<T>(url: string, cacheKey: string, processFn: (response: any) => T): void {
    this.http.get<any>(url).pipe(
      map(processFn)
    ).subscribe(freshData => {
      const cachedData = this.cacheService.get(cacheKey);
      if (!this.areEqual(cachedData, freshData)) {
        this.cacheService.set(cacheKey, freshData);
        this.sharedService.reloadComponent(); // Notify components to reload
      }
    });
  }

  private areEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  // Updated methods using caching
  readMessages(): Observable<Message[]> {
    return this.cachedGet<Message[]>(
      `${this.apiUrl}/readMessages`,
      (response) => this.processMessagesResponse(response)
    );
  }

  readMessagesByUsernameHash(usernameHash: string): Observable<Message[]> {
    return this.cachedGet<Message[]>(
      `${this.apiUrl}/readMessages/${usernameHash}`,
      (response) => this.processMessagesResponse(response)
    );
  }

  readUser(usernameHash: string): Observable<User> {
    return this.cachedGet<User>(
      `${this.apiUrl}/readUser/${usernameHash}`,
      (response) => response
    );
  }

  private processMessagesResponse(response: any[]): Message[] {
    return response.map(item => ({
      phoneNumber: item.phoneNumber,
      timestamp: item.timestamp,
      content: item.content,
      charCount: item.charCount,
      usernameHash: item.usernameHash
    }));
  }
  // User CRUD operations
  createUser(user: User): Observable<any> {
    const userData = { user };
    return this.http.post(`${this.apiUrl}/createUser`, userData, httpOptions);
  }

  readUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/readUsers`);
  }

  updateUser(usernameHash: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUser/${usernameHash}`, user, httpOptions);
  }

  deleteUser(usernameHash: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${usernameHash}`);
  }

  // Message CRUD operations
  createMessage(message: Message): Observable<any> {
    return this.http.post(`${this.apiUrl}/createMessage`, message, httpOptions);
  }




  deleteMessagesByUsernameHash(usernameHash: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteMessages/${usernameHash}`);
  }
}


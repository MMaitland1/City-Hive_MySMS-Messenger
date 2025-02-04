import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { CacheService } from '../services/CacheService';
import { SharedService } from './shared.service';

// Comprehensive HTTP Configuration: Define default HTTP options for requests
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  })
};

@Injectable({
  providedIn: 'root' // This makes the service available globally across the application
})
export class RubyApiService {
  // Configurable API Endpoint
  private readonly API_URL = 'http://localhost:3000'//'; http://backend:3000// Base URL for the backend API
  private readonly CACHE_PREFIX = 'API_CACHE:'; // Prefix used to store cached data
  private readonly RETRY_ATTEMPTS = 2; // Number of retry attempts for failed requests

  constructor(
    private http: HttpClient, // Inject HttpClient to make HTTP requests
    private cacheService: CacheService, // Inject CacheService for managing cached data
    private sharedService: SharedService // Inject SharedService to trigger reloading components when needed
  ) {}

  // Advanced Cached GET Request Handler: Handles GET requests with caching and background refresh
  private cachedGet<T>(
    url: string, 
    processFn: (response: any) => T, 
    forceFresh: boolean = false
  ): Observable<T> {
    const cacheKey = `${this.CACHE_PREFIX}${url}`; // Generate a unique cache key based on the URL
    const cached = this.cacheService.get(cacheKey); // Retrieve the cached data if available

    // If we need fresh data or no cached data exists, perform a fresh HTTP request
    if (forceFresh || !cached) {
      return this.http.get<any>(url).pipe(
        retry(this.RETRY_ATTEMPTS), // Retry the request a few times in case of failure
        map(processFn), // Transform the response data using the provided function
        tap(data => this.cacheService.set(cacheKey, data)), // Cache the fresh data
        catchError(this.handleError) // Handle errors in a centralized manner
      );
    }

    // If data exists in the cache, return it while performing a background refresh
    return of(cached).pipe(
      tap(() => this.backgroundRefresh(url, cacheKey, processFn)) // Initiate background refresh
    );
  }

  // Background Cache Synchronization: Refreshes the cache in the background if new data is available
  private backgroundRefresh<T>(
    url: string, 
    cacheKey: string, 
    processFn: (response: any) => T
  ): void {
    this.http.get<any>(url).pipe(
      map(processFn), // Process the fresh data
      catchError(() => of(null)) // Return null if there's an error during background refresh
    ).subscribe(freshData => {
      if (freshData && !this.areEqual(this.cacheService.get(cacheKey), freshData)) {
        // If the new data differs from the cached data, update the cache and trigger component reload
        this.cacheService.set(cacheKey, freshData);
        this.sharedService.reloadComponent();
      }
    });
  }

  // Deep Object Comparison: Compares two objects for equality (by comparing their JSON string representations)
  private areEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  // Centralized Error Handling: Handles HTTP errors by logging and returning an observable error
  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error instanceof ErrorEvent 
      ? `Client Error: ${error.error.message}` // Client-side error
      : `Server Error: ${error.status}, ${error.error}`; // Server-side error
    
    console.error(errorMessage); // Log the error message
    return throwError(() => new Error(errorMessage)); // Return an observable error
  }

  // Message Retrieval Methods: Fetches messages from the API

  // Retrieves all messages
  readMessages(): Observable<Message[]> {
    return this.cachedGet<Message[]>(
      `${this.API_URL}/readMessages`, // URL for reading messages
      this.processMessagesResponse // Function to process the response data into Message objects
    );
  }

  // Retrieves messages for a specific user by username hash
  readMessagesByUsernameHash(usernameHash: string): Observable<Message[]> {
    return this.cachedGet<Message[]>(
      `${this.API_URL}/readMessages/${usernameHash}`, // URL for reading messages by username hash
      this.processMessagesResponse // Function to process the response data into Message objects
    );
  }

  // User Operations: Methods for user data retrieval

  // Retrieves a user by username hash
  readUser(usernameHash: string): Observable<User> {
    return this.cachedGet<User>(
      `${this.API_URL}/readUser/${usernameHash}`, // URL for reading user data
      user => user // No transformation needed, just return the user object as it is
    );
  }

  // Response Transformation: Processes API responses into Message objects
  private processMessagesResponse = (response: any[]): Message[] => 
    response.map(item => ({
      phoneNumber: item.phoneNumber || '', // Default to empty string if not present
      timestamp: item.timestamp || new Date().toISOString(), // Default to current timestamp if not present
      content: item.content || '', // Default to empty string if not present
      charCount: item.charCount || 0, // Default to 0 if not present
      usernameHash: item.usernameHash || '' // Default to empty string if not present
    }));

  // CRUD Operations with Enhanced Error Handling: Methods for creating, updating, and deleting user data

  // Creates a new user
  createUser(user: User): Observable<any> {
    return this.http.post(
      `${this.API_URL}/createUser`, 
      { user }, 
      HTTP_OPTIONS // Use predefined HTTP options for the request
    ).pipe(
      catchError(this.handleError) // Handle errors using centralized error handler
    );
  }

  // Updates user information
  updateUser(usernameHash: string, user: User): Observable<any> {
    return this.http.put(
      `${this.API_URL}/updateUser/${usernameHash}`, 
      user, 
      HTTP_OPTIONS // Use predefined HTTP options for the request
    ).pipe(
      catchError(this.handleError) // Handle errors using centralized error handler
    );
  }

  // Deletes a user by username hash
  deleteUser(usernameHash: string): Observable<any> {
    return this.http.delete(
      `${this.API_URL}/deleteUser/${usernameHash}`, 
      HTTP_OPTIONS // Use predefined HTTP options for the request
    ).pipe(
      catchError(this.handleError) // Handle errors using centralized error handler
    );
  }

  // Message Management: Methods for creating and deleting messages

  // Creates a new message
  createMessage(message: Message): Observable<any> {
    return this.http.post(
      `${this.API_URL}/createMessage`, 
      message, 
      HTTP_OPTIONS // Use predefined HTTP options for the request
    ).pipe(
      catchError(this.handleError) // Handle errors using centralized error handler
    );
  }

  // Deletes messages by username hash
  deleteMessagesByUsernameHash(usernameHash: string): Observable<any> {
    return this.http.delete(
      `${this.API_URL}/deleteMessages/${usernameHash}`, 
      HTTP_OPTIONS // Use predefined HTTP options for the request
    ).pipe(
      catchError(this.handleError) // Handle errors using centralized error handler
    );
  }
}

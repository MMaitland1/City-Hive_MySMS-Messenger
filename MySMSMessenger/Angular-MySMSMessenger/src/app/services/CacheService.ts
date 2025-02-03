import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally across the application
})
export class CacheService {
  private readonly CACHE_KEY = 'apiCache'; // Key used to store the cache in localStorage
  private readonly MAX_CACHE_SIZE = 50;   // Maximum number of items allowed in the cache

  constructor() {}

  // Retrieve the cache from localStorage, returning it as an object
  // If cache doesn't exist, return an empty object
  getCache(): { [key: string]: any } {
    const cache = localStorage.getItem(this.CACHE_KEY);
    return cache ? JSON.parse(cache) : {}; // Parse the cache string as an object
  }

  // Save the cache object back to localStorage as a string
  private saveCache(cache: { [key: string]: any }): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache)); // Convert cache object to JSON string
  }

  // Retrieve a value from the cache by its key
  get(key: string): any | null {
    const cache = this.getCache(); // Get the current cache
    return cache[key] || null; // Return the value associated with the key, or null if not found
  }

  // Set a key-value pair in the cache
  set(key: string, value: any): void {
    const cache = this.getCache(); // Get the current cache
    
    // Enforce the cache size limit
    const keys = Object.keys(cache); // Get all keys in the cache
    if (keys.length >= this.MAX_CACHE_SIZE) {
      delete cache[keys[0]]; // If cache exceeds the limit, delete the oldest entry
    }
    
    cache[key] = value; // Add or update the cache with the new key-value pair
    this.saveCache(cache); // Save the updated cache back to localStorage
  }

  // Clear the entire cache by removing it from localStorage
  clear(): void {
    localStorage.removeItem(this.CACHE_KEY); // Remove the cache item from localStorage
  }
}

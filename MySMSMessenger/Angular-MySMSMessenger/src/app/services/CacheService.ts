import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_KEY = 'apiCache';
  private readonly MAX_CACHE_SIZE = 50;

  constructor() {}

  getCache(): { [key: string]: any } {
    const cache = localStorage.getItem(this.CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  }

  private saveCache(cache: { [key: string]: any }): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }

  get(key: string): any | null {
    const cache = this.getCache();
    return cache[key] || null;
  }

  set(key: string, value: any): void {
    const cache = this.getCache();
    
    // Enforce cache limit
    const keys = Object.keys(cache);
    if (keys.length >= this.MAX_CACHE_SIZE) {
      delete cache[keys[0]]; // Remove oldest entry
    }
    
    cache[key] = value;
    this.saveCache(cache);
  }

  clear(): void {
    localStorage.removeItem(this.CACHE_KEY);
  }
}
import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Message } from './models/Message';
import { RubyApiService } from './services/ruby-api.service'; 
import { SessionService } from './services/session.service';
import { isPlatformBrowser } from '@angular/common';
import { CacheService } from './services/CacheService';

@Component({
  selector: 'app-root', // Defines the selector for this component in the HTML
  templateUrl: './app.component.html', // Path to the HTML template for this component
  styleUrls: ['./app.component.css'], // Path to the component's stylesheet
})
export class AppComponent implements OnInit {
  // Application core properties
  title = 'MySMSMessenger'; // The main title of the app
  pageTitle = 'Home'; // The title of the current page (dynamic)
  historyLength: number = 0; // Keeps track of the number of messages in the history
  isWideEnough: boolean = true; // Flag to check if the window is wide enough for a specific layout

  constructor(
    private router: Router, // Injects the Router to handle routing and navigation
    private apiService: RubyApiService, // Injects the API service to interact with backend APIs
    private sessionService: SessionService, // Injects the SessionService to manage user sessions
    private cacheService: CacheService, // Injects the CacheService to manage cached data
    @Inject(PLATFORM_ID) private platformId: Object // Injects PLATFORM_ID to detect the platform (browser or server)
  ) {
    // Subscribe to router navigation events to update the title and check for message history on route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/messageHistory') {
          this.checkForMessageHistory(event.urlAfterRedirects);
        }
        this.updateTitle(event.urlAfterRedirects); // Update the title based on the new URL
      }
    });
  }

  ngOnInit() {
    // Initialize browser-specific functionality (e.g., checking window size)
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize(); // Run window size check on initialization
    }
  }

  // Check user login status via SessionService
  isLoggedIn(): boolean {
    const userSession = this.sessionService.getSessionData(); // Get the current user session
    return userSession !== null && userSession.usernameHash !== ''; // Return true if the user is logged in
  }

  // Logout method: clear session and navigate to home
  logout(): void {
    this.sessionService.clearSessionData(); // Clear user session data
    this.cacheService.clear(); // Clear cached data
    this.router.navigate(['/']); // Navigate back to the home page
  }

  // Responsive design: handle window resize to adjust layout dynamically
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize(); // Recheck the window size when resizing
    }
  }

  // Check and set responsive layout based on window width
  checkWindowSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isWideEnough = window.innerWidth > 1100; // Adjust layout if window width is greater than 1100px
    }
  }

  // Retrieve message history for the current user
  checkForMessageHistory(url: string) {
    if (
      isPlatformBrowser(this.platformId) && // Ensure this is running in the browser
      (url === '/message' || url === '/messageHistory') // Check if we are navigating to message-related routes
    ) {
      const userSession = this.sessionService.getSessionData(); // Get the current user session
      const usernameHash = userSession ? userSession.usernameHash : ''; // Get the username hash of the logged-in user
      
      // If the user is logged in, fetch their message history
      if (usernameHash) {
        this.apiService.readMessagesByUsernameHash(usernameHash).subscribe((messages: Message[]) => {
          this.historyLength = messages.length; // Update the history length based on the number of messages
        });
      }
    }
  }

  // Dynamic page title management: Update the title based on the current route
  updateTitle(url: string) {
    // Mapping of route URLs to page titles
    const titleMap: { [key: string]: string } = {
      '/': ' ', // Home page title
      '/login': 'Log In', // Login page title
      '/signup': 'Sign Up', // Sign-up page title
      '/message': 'New Message', // New message page title
      '/messageHistory': `Message History(${this.historyLength})`, // Message history page title with dynamic length
    };
    this.pageTitle = titleMap[url] || 'Unknown Page'; // Set the title for the current page based on the URL
    this.checkForMessageHistory(url); // Also check for message history if the URL is related to messages
  }
}

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
import { SharedService } from './services/shared.service'; // Shared service for common functionality
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject for reactive data management

@Component({
  selector: 'app-root', // The selector for the root component
  templateUrl: './app.component.html', // Path to the HTML template
  styleUrls: ['./app.component.css'], // Path to the CSS styles
})
export class AppComponent implements OnInit {
  title = 'MySMSMessenger'; // Application title
  pageTitle = 'Home'; // Default page title
  historyLength: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Initialize a BehaviorSubject for message history length, starting with 0
  isWideEnough: boolean = true; // Flag to check if the window is wide enough for a particular layout
  isFirstLogin = true; // Flag to track if it's the first login of the user

  constructor(
    private router: Router, // Inject Router to navigate between pages
    private apiService: RubyApiService, // Inject RubyApiService to interact with API
    private sessionService: SessionService, // Inject SessionService to manage user session
    private cacheService: CacheService, // Inject CacheService to manage cached data
    @Inject(PLATFORM_ID) private platformId: Object, // Inject platformId to check if app is running on browser or server
    private sharedService: SharedService // Inject SharedService to communicate across components
  ) {
    // Subscribe to router events to react to navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update page title based on the URL after navigation
        this.updateTitle(event.urlAfterRedirects);
        // Refresh message history count whenever the page is navigated to
        this.checkForMessageHistory(event.urlAfterRedirects); 
      }
    });

    // Subscribe to the reloadComponent$ observable in SharedService to trigger page updates
    this.sharedService.reloadComponent$.subscribe(() => {
      this.checkForMessageHistory(this.router.url); // Refresh message history count when reload is triggered
    });
  }

  ngOnInit() {
    // Ensure message history count is updated on page load or refresh
    this.checkForMessageHistory(this.router.url);

    // Check window size when the app is running on the browser
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
    }
  }

  // Method to check if the user is logged in by checking session data
  isLoggedIn(): boolean {
    const userSession = this.sessionService.getSessionData(); // Get the current session data
    // Return true if session data is available and the usernameHash is not empty
    return userSession !== null && userSession.usernameHash !== '';
  }

  // Method to handle logout functionality
  logout(): void {
    this.sessionService.clearSessionData(); // Clear session data from the session service
    this.cacheService.clear(); // Clear cached data
    this.router.navigate(['/']); // Navigate to the home page after logging out
  }

  // HostListener to listen for window resize events and adjust layout accordingly
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize(); // Recheck window size when resizing
    }
  }

  // Method to check the window size and adjust the layout
  checkWindowSize() {
    if (isPlatformBrowser(this.platformId)) {
      // If the window's width is greater than 1100px, adjust the layout to be wide
      this.isWideEnough = window.innerWidth > 1100;
    }
  }

  // Method to initialize and refresh the message history count
  checkForMessageHistory(url: string) {
    const userSession = this.sessionService.getSessionData(); // Get the current user session data
    const usernameHash = userSession?.usernameHash; // Retrieve usernameHash from the session data

    if (usernameHash) {
      // If a valid usernameHash exists, make an API call to fetch message history
      this.apiService.readMessagesByUsernameHash(usernameHash).subscribe({
        next: (messages: Message[]) => {
          const messageCount = messages.length; // Count the number of messages
          this.historyLength.next(messageCount); // Update the message count using BehaviorSubject
          this.updateTitle(url); // Update the page title based on the message count
        },
        error: (error) => {
          console.error('Error fetching message history:', error); // Log any error if the API call fails
        }
      });
    } else {
    }
  }

  // Method to update the page title based on the current URL
  updateTitle(url: string) {
    const titleMap: { [key: string]: string } = {
      '/': 'Home', // Home page title
      '/login': 'Log In', // Log In page title
      '/signup': 'Sign Up', // Sign Up page title
      '/message': 'New Message', // New Message page title
      '/messageHistory': `Message History(${this.historyLength.getValue()})`, // Dynamic title based on message history length
    };
    // Update the page title according to the current URL or default to 'Unknown Page' if URL doesn't match any entry
    this.pageTitle = titleMap[url] || 'Unknown Page';
  }
}

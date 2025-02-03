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
import { SessionService } from './services/session.service'; // Import SessionService
import { isPlatformBrowser } from '@angular/common';
import { CacheService } from './services/CacheService'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MySMSMessenger';
  pageTitle = 'Home'; // Default title
  historyLength: number = 0; // Initialize historyLength
  isWideEnough: boolean = true;

  constructor(
    private router: Router,
    private apiService: RubyApiService,
    private sessionService: SessionService, // Inject SessionService
    private cacheService: CacheService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        if(event.urlAfterRedirects === '/messageHistory') {
        this.checkForMessageHistory(event.urlAfterRedirects);
        }this.updateTitle(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize session storage only in the browser
      this.checkWindowSize();
    }
  }

  // Use SessionService to check for login status
  isLoggedIn(): boolean {
    const userSession = this.sessionService.getSessionData();
    return userSession !== null && userSession.usernameHash !== '';
  }

  // Use SessionService to logout
  logout(): void {
    this.sessionService.clearSessionData();
    this.cacheService.clear() // Use SessionService to clear session
    this.router.navigate(['/']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
    }
  }

  checkWindowSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isWideEnough = window.innerWidth > 1100;
    }
  }

  checkForMessageHistory(url: string) {
    if (
      isPlatformBrowser(this.platformId) &&
      (url === '/message' || url === '/messageHistory')
    ) {
      const userSession = this.sessionService.getSessionData();
      const usernameHash = userSession ? userSession.usernameHash : '';
      
      if (usernameHash) {
        this.apiService.readMessagesByUsernameHash(usernameHash).subscribe((messages: Message[]) => {
          this.historyLength = messages.length;

        });
      }
    }
  }

  updateTitle(url: string) {
    
    const titleMap: { [key: string]: string } = {
      '/': ' ',
      '/login': 'Log In',
      '/signup': 'Sign Up',
      '/message': 'New Message',
      '/messageHistory': `Message History(${this.historyLength})`, // Dynamically set history length
    };
    this.pageTitle = titleMap[url] || 'Unknown Page';
  this.checkForMessageHistory(url);
  }
}

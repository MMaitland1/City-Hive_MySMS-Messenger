import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Message } from './models/Message';
import { isPlatformBrowser } from '@angular/common';  // Import the necessary function

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MySMSMessenger';
  pageTitle = 'Home'; // Default title
  MESSAGES: Message[] = [
    {
      phoneNumber: '999-888-7777',
      timestamp: 'Sunday, 17-May-20 11:18:45 UTC',
      content: 'Hi! This is a message. I’m a fancy message that lives within the boundaries of a box.',
      charCount: 87
    },
    {
      phoneNumber: '888-777-6666',
      timestamp: 'Monday, 18-May-20 14:20:30 UTC',
      content: 'Hello! Just testing out this message box component.',
      charCount: 45
    },
    {
      phoneNumber: '777-666-5555',
      timestamp: 'Tuesday, 19-May-20 09:10:15 UTC',
      content: 'This is another message to see how the UI handles multiple messages.',
      charCount: 60
    },
    {
      phoneNumber: '666-555-4444',
      timestamp: 'Wednesday, 20-May-20 16:35:50 UTC',
      content: 'A short message!',
      charCount: 18
    },
    {
      phoneNumber: '555-444-3333',
      timestamp: 'Thursday, 21-May-20 19:55:05 UTC',
      content: 'Final test message to complete the set of five.',
      charCount: 40
    }
  ];

  isWideEnough: boolean = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only check window size on the client side (browser environment)
      this.checkWindowSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
    }
  }

  updateTitle(url: string) {
    const titleMap: { [key: string]: string } = {
      '/': ' ',
      '/login': 'Log In',
      '/signup': 'Sign Up',
      '/message': 'New Message',
      '/messageHistory': 'Message History'
    };
    this.pageTitle = titleMap[url] || 'Unknown Page';
  }

  checkWindowSize() {
    this.isWideEnough = window.innerWidth > 1100;
  }
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../models/Message'; // Importing the Message model for type safety
import { RubyApiService } from '../../services/ruby-api.service'; // Importing the API service to interact with the backend
import { SharedService } from '../../services/shared.service'; // Importing the SharedService to communicate with other components
import { SessionService } from '../../services/session.service'; // Importing the SessionService to manage user session data
import { Subscription } from 'rxjs'; // Importing Subscription to manage observables

@Component({
  selector: 'app-messages', // The component selector used in the template
  templateUrl: './messages.component.html', // Path to the HTML template for the component
  styleUrls: ['./messages.component.css'] // Path to the component's CSS file for styling
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() messages: Message[] = []; // Input property to receive an array of messages from a parent component
  usernameHash: string = ''; // Variable to store the hashed username (for session-based filtering)
  private subscription!: Subscription; // A private variable to hold the subscription to the shared service

  constructor(
    private apiService: RubyApiService, // Injecting the API service to handle communication with the backend
    private sharedService: SharedService, // Injecting the shared service to listen for reload events
    private sessionService: SessionService // Injecting the session service to manage user session data
  ) {}

  // ngOnInit is called when the component is initialized
  ngOnInit(): void {
    // Check if there is a session and fetch the username hash, then fetch messages accordingly
    this.checkSessionForUsernameHash();
    // Subscribe to the reloadComponent$ observable to listen for reload requests
    this.subscription = this.sharedService.reloadComponent$.subscribe(() => {
      this.checkSessionForUsernameHash(); // Refresh the messages when the reload event is triggered
    });
  }

  // ngOnDestroy is called when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the shared service to prevent memory leaks
    this.subscription.unsubscribe();
  }

  // Method to check if there is a valid session and retrieve the usernameHash
  checkSessionForUsernameHash(): void {
    const userSession = this.sessionService.getSessionData(); // Fetch session data from the session service
    if (userSession) {
      // If session data exists, set the usernameHash from the session
      this.usernameHash = userSession.usernameHash;
      // Fetch messages associated with the usernameHash
      this.readMessagesByUsernameHash(this.usernameHash);
    } else {
      // If there is no session, fetch all messages
      this.readMessages();
    }
  }

  // Method to fetch all messages from the backend
  readMessages(): void {
    // Call the API service to fetch messages without any session-based filtering
    this.apiService.readMessages().subscribe((messages: Message[]) => {
      // Sort the messages in descending order based on their timestamp
      this.messages = messages.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    });
  }

  // Method to fetch messages filtered by the usernameHash (session-based)
  readMessagesByUsernameHash(usernameHash: string): void {
    // Call the API service to fetch messages filtered by usernameHash
    this.apiService.readMessagesByUsernameHash(usernameHash).subscribe((messages: Message[]) => {
      // Sort the messages in descending order based on their timestamp
      this.messages = messages.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    });
  }
}

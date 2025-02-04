import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importing necessary form-related modules
import { Message } from '../../models/Message'; // Importing the Message model to type the message object
import { RubyApiService } from '../../services/ruby-api.service'; // Service for making API calls to the backend
import { SharedService } from '../../services/shared.service'; // Shared service for common functionality like reloading components
import { SessionService } from '../../services/session.service'; // Service for managing user session data

@Component({
  selector: 'app-message-form', // The component's selector used in HTML
  templateUrl: './message-form.component.html', // Path to the component's HTML template
  styleUrls: ['./message-form.component.css'] // Path to the component's CSS styles
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup; // The form group that holds the form fields for the message
  maxLength = 250; // Maximum length for the message content
  charCount = 0; // Variable to track the number of characters typed in the content field

  constructor(
    private fb: FormBuilder, // Injecting the FormBuilder service to create reactive forms
    private rubyApiService: RubyApiService, // Injecting the RubyApiService to handle API calls
    private sharedService: SharedService, // Injecting the SharedService to reload components and update counts
    private sessionService: SessionService // Injecting the SessionService to manage user session data
  ) { }

  // ngOnInit is called when the component is initialized
  ngOnInit(): void {
    // Initialize the message form with validation rules
    this.messageForm = this.fb.group({
      phoneNumber: [
        '', // Default value for the phone number field
        [
          Validators.required, // Phone number is required
          Validators.pattern(/^[0-9]{10}$/) // Validates that the phone number has exactly 10 digits
        ]
      ],
      content: [
        '', // Default value for the message content field
        [
          Validators.required, // Content is required
          Validators.maxLength(this.maxLength) // Message content cannot exceed the specified maximum length
        ]
      ]
    });
  }

  // Method to update the character count as the user types in the content field
  updateCharCount(): void {
    const messageValue = this.messageForm.get('content')?.value || ''; // Get the current value of the content field
    this.charCount = messageValue.length; // Update the character count based on the length of the message content
  }

  // Method to handle form submission
  submitForm(): void {
    // Check if the form is valid
    if (this.messageForm.valid) {
      const userSession = this.sessionService.getSessionData(); // Get the current session data (logged-in user)
  
      // If no session exists, log an error and return
      if (!userSession) {
        console.error('No user session found. Redirecting to login.');
        return;
      }
  
      // Get the current timestamp and format it
      const now = new Date();
      const dayName = now.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
      const day = now.toLocaleString('en-US', { day: '2-digit', timeZone: 'UTC' });
      const month = now.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
      const year = now.toLocaleString('en-US', { year: '2-digit', timeZone: 'UTC' });
      const time = now.toLocaleString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
      });
      const formattedDate = `${dayName}, ${day}-${month}-${year} ${time} UTC`; // Format the date and time
  
      // Create a new message object to be sent to the backend
      const newMessage: Message = {
        phoneNumber: this.messageForm.get('phoneNumber')?.value, // Get the phone number from the form field
        timestamp: formattedDate, // Use the formatted timestamp
        content: this.messageForm.get('content')?.value, // Get the message content from the form field
        charCount: this.charCount, // Attach the current character count
        usernameHash: userSession.usernameHash // Attach the username hash from the session data
      };
  
      // Call the API to create a new message
      this.rubyApiService.createMessage(newMessage).subscribe({
        next: (response) => {
          console.log('Message created successfully:', response); // Log the successful creation of the message
          this.sharedService.reloadComponent(); // Trigger reload to update components (like message count)
          this.clearForm(new Event('submit')); // Reset the form and character count after successful submission
        },
        error: (error) => {
          console.error('Error creating message:', error); // Log any error that occurs during message creation
        }
      });
    }
  }

  // Method to clear the form fields and reset the character count
  clearForm(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    this.messageForm.reset(); // Reset the form fields to their initial state
    this.charCount = 0; // Reset the character count to 0
  }
}

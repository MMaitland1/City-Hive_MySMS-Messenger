import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/Message'; // Importing the Message model
import { RubyApiService } from '../../services/ruby-api.service'; // Service for API calls
import { SharedService } from '../../services/shared.service'; // Shared service for common functionality
import { SessionService } from '../../services/session.service'; // Service to manage user session data

@Component({
  selector: 'app-message-form', // Component selector used in HTML
  templateUrl: './message-form.component.html', // Template file for the component
  styleUrls: ['./message-form.component.css'] // CSS file for the component
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup; // FormGroup to manage the message form
  maxLength = 250; // Maximum allowed length for the message content
  charCount = 0; // Variable to track the number of characters in the message content

  constructor(
    private fb: FormBuilder, // FormBuilder service to create reactive forms
    private rubyApiService: RubyApiService, // Service to interact with the Ruby API
    private sharedService: SharedService, // Shared service for common functionality
    private sessionService: SessionService // Service to manage user session data
  ) { }

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.messageForm = this.fb.group({
      phoneNumber: [
        '', // Default value for the phone number field
        [
          Validators.required, // Phone number is required
          Validators.pattern(/^[0-9]{10}$/) // Phone number must be exactly 10 digits
        ]
      ],
      content: [
        '', // Default value for the message content field
        [
          Validators.required, // Message content is required
          Validators.maxLength(this.maxLength) // Message content cannot exceed maxLength
        ]
      ]
    });
  }

  // Method to update the character count as the user types
  updateCharCount(): void {
    const messageValue = this.messageForm.get('content')?.value || ''; // Get the current value of the message content
    this.charCount = messageValue.length; // Update the character count
  }

  // Method to handle form submission
  submitForm(): void {
    if (this.messageForm.valid) { // Check if the form is valid
      const userSession = this.sessionService.getSessionData(); // Retrieve user session data

      if (!userSession) { // If no session data is found, log an error and return
        console.error('No user session found. Redirecting to login.');
        return;
      }

      // Format the current date and time
      const now = new Date();
      const dayName = now.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }); // Get the full day name (e.g., "Monday")
      const day = now.toLocaleString('en-US', { day: '2-digit', timeZone: 'UTC' }); // Get the day as a two-digit number (e.g., "01")
      const month = now.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }); // Get the abbreviated month name (e.g., "Jan")
      const year = now.toLocaleString('en-US', { year: '2-digit', timeZone: 'UTC' }); // Get the two-digit year (e.g., "23")
      const time = now.toLocaleString('en-US', {
        hour12: false, // Use 24-hour format
        hour: '2-digit', // Two-digit hour
        minute: '2-digit', // Two-digit minute
        second: '2-digit', // Two-digit second
        timeZone: 'UTC' // Use UTC timezone
      });
      const formattedDate = `${dayName}, ${day}-${month}-${year} ${time} UTC`; // Combine into a formatted date string

      // Create a new Message object with form data and session data
      const newMessage: Message = {
        phoneNumber: this.messageForm.get('phoneNumber')?.value, // Get the phone number from the form
        timestamp: formattedDate, // Use the formatted date and time
        content: this.messageForm.get('content')?.value, // Get the message content from the form
        charCount: this.charCount, // Include the character count
        usernameHash: userSession.usernameHash // Include the username hash from the session
      };

      // Call the API to create the message
      this.rubyApiService.createMessage(newMessage)
        .subscribe({
          next: (response) => { // Handle successful response
            console.log('Message created successfully:', response);
            this.sharedService.reloadComponent(); // Reload the component to reflect changes
            this.clearForm(new Event('submit')); // Clear the form after submission
          },
          error: (error) => { // Handle error response
            console.error('Error creating message:', error);
          }
        });
    }
  }

  // Method to clear the form
  clearForm(event: Event): void {
    event.preventDefault(); // Prevent default form submission behavior
    this.messageForm.reset(); // Reset the form fields to their initial state
    this.charCount = 0; // Reset the character count
  }
}
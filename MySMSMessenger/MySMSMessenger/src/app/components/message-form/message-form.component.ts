import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/Message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  messageForm: FormGroup;
  maxLength = 250;
  charCount = 0;

  constructor(private fb: FormBuilder) {
    // The form has two controls: 'phoneNumber' and 'content'
    this.messageForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          // Example: simple pattern for a 10-digit phone number
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxLength)
        ]
      ]
    });
  }

  updateCharCount(): void {
    // Safely read the 'content' control from the form
    const messageValue = this.messageForm.get('content')?.value || '';
    this.charCount = messageValue.length;
  }

  submitForm(): void {
    if (this.messageForm.valid) {
      // Get a concise, properly formatted UTC date string
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
      const formattedDate = `${dayName}, ${day}-${month}-${year} ${time} UTC`;

      // Build a new Message object
      const newMessage: Message = {
        phoneNumber: this.messageForm.get('phoneNumber')?.value,
        timestamp: formattedDate,
        content: this.messageForm.get('content')?.value,
        charCount: this.charCount
      };

      console.log('Message object:', newMessage);

      // Reset
      this.messageForm.reset();
      this.charCount = 0;
    }
  }

  clearForm(event: Event): void {
    event.preventDefault();
    this.messageForm.reset();
    this.charCount = 0;
  }

  count: number = 0;

  increaseCount(): void {
    this.count++;
  }
myFunction(hello: string) {
    console.log(hello);
  }














  
}

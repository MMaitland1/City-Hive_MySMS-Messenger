import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/Message';
import { RubyApiService } from '../../services/ruby-api.service';
import { SharedService } from '../../services/shared.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup;
  maxLength = 250;
  charCount = 0;

  constructor(
    private fb: FormBuilder,
    private rubyApiService: RubyApiService,
    private sharedService: SharedService,
    private sessionService: SessionService // ✅ Inject SessionService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
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
    const messageValue = this.messageForm.get('content')?.value || '';
    this.charCount = messageValue.length;
  }

  submitForm(): void {
    if (this.messageForm.valid) {
      const userSession = this.sessionService.getSessionData();

      if (!userSession) {
        console.error('No user session found. Redirecting to login.');
        return;
      }

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

      const newMessage: Message = {
        phoneNumber: this.messageForm.get('phoneNumber')?.value,
        timestamp: formattedDate,
        content: this.messageForm.get('content')?.value,
        charCount: this.charCount,
        usernameHash: userSession.usernameHash, // ✅ Get from SessionService
      };

      this.rubyApiService.createMessage(newMessage)
        .subscribe({
          next: (response) => {
            console.log('Message created successfully:', response);
            this.sharedService.reloadComponent();
            this.clearForm(new Event('submit'));
          },
          error: (error) => {
            console.error('Error creating message:', error);
          }
        });
    }
  }

  clearForm(event: Event): void {
    event.preventDefault();
    this.messageForm.reset();
    this.charCount = 0;
  }
}

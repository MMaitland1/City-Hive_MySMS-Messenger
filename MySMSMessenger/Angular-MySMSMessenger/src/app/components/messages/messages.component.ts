import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../models/Message';
import { RubyApiService } from '../../services/ruby-api.service';
import { SharedService } from '../../services/shared.service';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() messages: Message[] = [];
  usernameHash: string = '';
  private subscription!: Subscription;

  constructor(
    private apiService: RubyApiService,
    private sharedService: SharedService,
    private sessionService: SessionService // ✅ Inject SessionService
  ) {}

  ngOnInit(): void {
    this.checkSessionForUsernameHash();
    // Subscribe to the shared service to reload the messages
    this.subscription = this.sharedService.reloadComponent$.subscribe(() => {
      this.checkSessionForUsernameHash();
    });

  }

  ngOnDestroy(): void {
    // Unsubscribe from the shared service
    this.subscription.unsubscribe();
  }

  checkSessionForUsernameHash(): void {
    const userSession = this.sessionService.getSessionData(); // ✅ Get session data
    if (userSession) {
      this.usernameHash = userSession.usernameHash;
      this.readMessagesByUsernameHash(this.usernameHash);
    } else {
      this.readMessages();
    }
  }

  readMessages(): void {
    this.apiService.readMessages().subscribe((messages: Message[]) => {
      this.messages = messages.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    });
  }
  
  readMessagesByUsernameHash(usernameHash: string): void {
    this.apiService.readMessagesByUsernameHash(usernameHash).subscribe((messages: Message[]) => {
      this.messages = messages.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    });
  }
}

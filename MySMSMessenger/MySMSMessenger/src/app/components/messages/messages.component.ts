import { Component, Input } from '@angular/core';
import { Message } from '../../models/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  @Input() messages: Message[] = [];
}

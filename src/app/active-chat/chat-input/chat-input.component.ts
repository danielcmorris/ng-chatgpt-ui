import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessageEntry } from '../../@models/message-entry';

@Component({
  selector: 'app-chat-input',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  @ViewChild('messageInput') messageInput?: ElementRef<HTMLDivElement>;
  public message = output<MessageEntry>();
  sendMessage(): void {
    const message = this.messageInput?.nativeElement.textContent?.trim();
    if (message) {
      console.log('Sending message:', message);
      const messageEntry: MessageEntry = {
        id: crypto.randomUUID(),
        content: message,
        role: 'user',
        createdAt: new Date(),
      };
      this.message.emit(messageEntry);
      if (this.messageInput) {
        this.messageInput.nativeElement.textContent = '';
      }
    } else {
      console.log('Message is empty, not sending.');
    }
  }
}

import { Component, effect, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessageEntry } from '../../@models/message-entry';
import { ListStore } from '../../@services/signal-store.service';
import { SignalBusService } from '../../@services/signal-bus.service';

@Component({
  selector: 'app-chat-input',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  @ViewChild('messageInput') messageInput?: ElementRef<HTMLDivElement>;
  public message = output<MessageEntry>();
  readonly store = inject(ListStore); // ✅ inject the service

  messageInputValue = signal('');

  private bus = inject(SignalBusService);
  constructor() {
    effect(() => {
      // reading these makes the effect react to changes
      const t = this.bus.tick();

      if (t > 0) {
        const v = this.bus.value();

        if (v != null) {

          this.messageInput!.nativeElement.textContent = v;
        }
      }
    });
  }
  sendMessage(): void {
    const message = this.messageInput?.nativeElement.textContent?.trim();
    if (message) {
      console.log('Sending message:', message);
      this.store.add(message.trim());

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

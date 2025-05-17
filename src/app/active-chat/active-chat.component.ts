import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MessageEntry } from '../@models/message-entry';
import { ChatGptService } from '../@services/chat-gpt.service';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessageListComponent } from './message-list/message-list.component';

@Component({
  selector: 'app-active-chat',
  imports: [ChatInputComponent, MessageListComponent],
  templateUrl: './active-chat.component.html',
  styleUrl: './active-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveChatComponent {
  public messages = signal<MessageEntry[]>([]);
  private readonly chatGptService = inject(ChatGptService);

  public onMessage(message: MessageEntry): void {
    this.messages.update((messages) => [...messages, message]);
    this.chatGptService.sendMessage(message).subscribe((response) => {
      this.messages.update((messages) => [...messages, response]);
    });
    console.debug('🔥🔥 ', this.messages());
  }
}

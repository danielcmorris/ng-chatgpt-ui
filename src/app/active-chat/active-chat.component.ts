import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MessageEntry } from '../@models/message-entry';
import { ChatGptService } from '../@services/chat-gpt.service';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessageListComponent } from './message-list/message-list.component';
import { SignalBusService } from '../@services/signal-bus.service';

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
  private readonly bus = inject(SignalBusService);
  private threadId: string = '';



  public onMessage(message: MessageEntry): void {

    if (this.threadId) {
      message.threadId = this.threadId;
    }
    this.messages.update((messages) => [...messages, message]);
    this.bus.thinking.set(true);
    this.chatGptService.sendMessage(message).subscribe((response) => {
      this.bus.thinking.set(false);
      this.threadId = response.threadId || this.threadId;
      this.messages.update((messages) => [...messages, response]);
    });
    console.debug('🔥🔥 ', this.messages());
  }
}

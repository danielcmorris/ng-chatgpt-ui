import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { MessageEntry } from '../../@models/message-entry';
import { AssistantMessageEntryComponent } from './assistant-message-entry/assistant-message-entry.component';
import { UserMessageEntryComponent } from './user-message-entry/user-message-entry.component';
import { ListStore } from '../../@services/signal-store.service';
import { SignalBusService } from '../../@services/signal-bus.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-message-list',
  imports: [UserMessageEntryComponent, AssistantMessageEntryComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements AfterViewInit {
  public messages = input<MessageEntry[]>([]);
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;
  constructor() {
   


    effect(() => {
      // This effect will run when 'messages' changes.

      this.messages(); // Access messages to make this effect depend on it.
      this.scrollToBottom();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
 


  private scrollToBottom(): void {
    // We need a small delay to ensure the view is updated before scrolling.
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }
}

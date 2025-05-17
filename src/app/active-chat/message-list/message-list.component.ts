import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MessageEntry } from '../../@models/message-entry';
import { AssistantMessageEntryComponent } from './assistant-message-entry/assistant-message-entry.component';
import { UserMessageEntryComponent } from './user-message-entry/user-message-entry.component';
    
@Component({
  selector: 'app-message-list',
  imports: [UserMessageEntryComponent, AssistantMessageEntryComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  public messages = input<MessageEntry[]>([]);
}

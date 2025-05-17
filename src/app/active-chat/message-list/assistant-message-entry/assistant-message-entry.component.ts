import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MessageEntry } from '../../../@models/message-entry';
import { AssistantMessageReactionsComponent } from './assistant-message-reactions/assistant-message-reactions.component';

@Component({
  selector: 'app-assistant-message-entry',
  imports: [AssistantMessageReactionsComponent],
  templateUrl: './assistant-message-entry.component.html',
  styleUrl: './assistant-message-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantMessageEntryComponent {
  public message = input<MessageEntry>();
}

import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { MessageEntry } from '../../../@models/message-entry';
import { UserMessageReactionsComponent } from './user-message-reactions/user-message-reactions.component';

@Component({
  selector: 'app-user-message-entry',
  imports: [UserMessageReactionsComponent],
  templateUrl: './user-message-entry.component.html',
  styleUrl: './user-message-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMessageEntryComponent {
  public message = input<MessageEntry>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-message-reactions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-message-reactions.component.html',
  styleUrl: './user-message-reactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMessageReactionsComponent { }

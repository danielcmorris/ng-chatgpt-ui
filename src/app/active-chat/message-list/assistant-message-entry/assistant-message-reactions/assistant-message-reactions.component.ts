import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-assistant-message-reactions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './assistant-message-reactions.component.html',
  styleUrl: './assistant-message-reactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantMessageReactionsComponent { }

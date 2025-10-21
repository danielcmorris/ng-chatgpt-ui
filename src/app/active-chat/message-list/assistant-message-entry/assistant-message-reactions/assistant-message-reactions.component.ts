import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-assistant-message-reactions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './assistant-message-reactions.component.html',
  styleUrl: './assistant-message-reactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantMessageReactionsComponent { 
readonly msg = input<string | null>(null);

clip(text:string){
     try {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard successfully!');
      }); 
    } catch (err) {
      console.error('Clipboard API failed, using fallback.', err);
     // this.copyFallback(text);
    }
  }
  
}

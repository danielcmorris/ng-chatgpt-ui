import { ChangeDetectionStrategy, Component, effect, input, OnDestroy, signal, WritableSignal } from '@angular/core';
import { MessageEntry } from '../../../@models/message-entry';
import { AssistantMessageReactionsComponent } from './assistant-message-reactions/assistant-message-reactions.component';

@Component({
  selector: 'app-assistant-message-entry',
  imports: [AssistantMessageReactionsComponent],
  templateUrl: './assistant-message-entry.component.html',
  styleUrl: './assistant-message-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantMessageEntryComponent implements OnDestroy {
  public message = input<MessageEntry>();
  public displayedContent: WritableSignal<string> = signal('');
  public isThinking: WritableSignal<boolean> = signal(false);
  private animationTimeoutId: any; // Renamed from typingTimeoutId for clarity

  private readonly BASE_TYPING_SPEED_MS = 10;
  private readonly MAX_RANDOM_DELAY_MS = 10;
  private readonly MIN_WORDS_PER_CHUNK = 1;
  private readonly MAX_WORDS_PER_CHUNK = 5;
  private readonly THINKING_TEXT = "Generating...";
  private readonly THINKING_DURATION_MS = 1000; // 1.5 seconds for thinking animation

  constructor() {
    effect(() => {
      const currentMessage = this.message();
      this.clearAllAnimations(); // Clear previous thinking or typing animations

      if (currentMessage?.content) {
        this.isThinking.set(true);
        this.displayedContent.set(this.THINKING_TEXT);

        this.animationTimeoutId = setTimeout(() => {
          this.isThinking.set(false);
          this.displayedContent.set(''); // Clear "Thinking" text before typing
          if (currentMessage?.content) { // Re-check content in case it changed
            this.typeMessageRandomly(currentMessage.content);
          }
        }, this.THINKING_DURATION_MS);
      } else {
        // No content, ensure clean state
        this.isThinking.set(false);
        this.displayedContent.set('');
      }
    });
  }

  private typeMessageRandomly(fullContent: string): void {
    const words = fullContent.split(/(\s+)/);
    let currentIndex = 0;

    const typeNextChunk = () => {
      if (currentIndex < words.length) {
        const wordsInChunk = Math.floor(Math.random() * (this.MAX_WORDS_PER_CHUNK - this.MIN_WORDS_PER_CHUNK + 1)) + this.MIN_WORDS_PER_CHUNK;
        let chunk = '';
        let wordsAdded = 0;

        while(currentIndex < words.length && wordsAdded < wordsInChunk) {
            chunk += words[currentIndex];
            if (words[currentIndex].trim().length > 0) {
                wordsAdded++;
            }
            currentIndex++;
        }
        
        this.displayedContent.update(content => content + chunk);

        if (currentIndex < words.length) {
          const randomDelay = this.BASE_TYPING_SPEED_MS + Math.random() * this.MAX_RANDOM_DELAY_MS;
          this.animationTimeoutId = setTimeout(typeNextChunk, randomDelay);
        } else {
          this.displayedContent.set(fullContent);
        }
      } else {
        this.displayedContent.set(fullContent);
      }
    };
    typeNextChunk();
  }

  private clearAllAnimations(): void {
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearAllAnimations();
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageEntry } from '../@models/message-entry';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  public sendMessage(message: MessageEntry): Observable<MessageEntry> {
    return of({
      id: crypto.randomUUID(),
      // content: random message
      content: this.generateRandomMessage(),
      role: 'assistant',
      createdAt: new Date(),
    });
  }

  private generateRandomMessage(): string {
    const loremWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

    const generateSentence = (numWords: number): string => {
      let sentence = "";
      for (let i = 0; i < numWords; i++) {
        sentence += loremWords[Math.floor(Math.random() * loremWords.length)] + " ";
      }
      return sentence.trim() + ".";
    };

    const generateParagraph = (numSentences: number): string => {
      let paragraph = "";
      for (let i = 0; i < numSentences; i++) {
        paragraph += generateSentence(Math.floor(Math.random() * 10) + 5) + " ";
      }
      return paragraph.trim();
    };

    const generateText = (numParagraphs: number): string => {
      let text = "";
      for (let i = 0; i < numParagraphs; i++) {
        text += generateParagraph(Math.floor(Math.random() * 3) + 2) + "\n\n"; // 2-4 sentences per paragraph
      }
      return text.trim();
    };

    const messages = [
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4),
      generateText(3),
      generateText(5),
      generateText(3),
      generateText(4)
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

}

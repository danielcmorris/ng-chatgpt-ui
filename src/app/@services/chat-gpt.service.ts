import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { MessageEntry } from '../@models/message-entry';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageReply } from '../@models/message-reply';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private server = environment.server;
  private sid = 'qtAJz5hEYB7pJoBQCTho';



  
  constructor(private http: HttpClient) {

  }

  public getThread_old(text: string, threadId: string = ''): Observable<any> {
    alert('this is deprecated');
    let payload = { text: text };
    let url = `${this.server}/api/AnalyzeText/markdown?sid=${this.sid}&threadId=${threadId}`;
    return this.http.post(url, payload) as Observable<any>;
  }


  public getThread(text: string, threadId: string = ''): Observable<any> {
    let payload = { text: text };
    let url = `https://localhost:7288/api/QdrantLookup/search`;
    return this.http.post(url, payload) as Observable<any>;
  }


  public sendMessage(message: MessageEntry): Observable<MessageEntry> {
    return this.getThread(message.content, message.threadId || '')
      .pipe(
        map((data: MessageReply) => {
          let msg =  data.choices[0]?.message.content;
          msg = this.updateLinks(msg);
          msg = msg.replaceAll('```html', '');
          // Process the data and return the desired output
          let ret: MessageEntry = {
            id: crypto.randomUUID(),
            runId: data.runId,
            threadId: data.threadId,
            content: msg,
            role: 'assistant',
            createdAt: new Date(),
          }
          console.log("Return Value", ret);
          return ret;
        })


      )
    // return of({
    //   id: crypto.randomUUID(),
    //   // content: random message
    //   content: this.generateRandomMessage(),
    //   role: 'assistant',
    //   createdAt: new Date(),
    // });
  }
  private updateLinks(html: string): string {
    const basePath = "/home/dmorris/Documents";
    const newBase = "https://docs.pinnaclepowersvcs.com/pge";

    // Step 1: Replace href paths
    const pathPattern = /href\s*=\s*"\/home\/dmorris\/Documents([^"]*)"/gi;
    let updated = html.replace(pathPattern, `href="${newBase}$1"`);

    // Step 2: Add target="_blank" only if not already present
    // This regex finds <a ...> tags that have href= but no target=
    const targetPattern = /<a\s+([^>]*href="[^"]*"(?:(?!target=)[^>])*)>/gi;
    updated = updated.replace(targetPattern, `<a $1 target="_blank">`);

    return updated;
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

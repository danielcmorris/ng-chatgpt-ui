import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalBusService {

  readonly value = signal<string | null>(null);
  readonly tick = signal(0);

  populate(v: string) {
    this.value.set(v);
    this.tick.update(n => n + 1); // one-shot trigger
    console.debug('SignalBusService.populate:', v);
    this.clip(v);
  }

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
  
  reset() {
    this.value.set(null);
  }

}

import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { ListStore } from './@services/signal-store.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SignalBusService } from './@services/signal-bus.service';
import { interval, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [NgFor, FormsModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatDrawerContainer, MatDrawer, ActiveChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pinnacle Power Regulation ChatBot';
  showFiller = false;
  readonly store = inject(ListStore); // ✅ inject the service
   bus = inject(SignalBusService);
  public generatingContent = signal('Searching Regulations....');
  public delayMessages = [
      'First message',
      'Second message',
      'Third message',
      'Done rotating',
    ];
  // one-shot populate signals
  populateValue = signal<string | null>(null);
  populateTick = signal(0);


  newItem = '';


  constructor() {
    effect(() => {
      this.startFakeDelay()

    });
  }


  addItem() {
    if (this.newItem.trim()) {
      this.store.add(this.newItem.trim());
      this.newItem = '';
    }
  }

  onPick(item: string, ev: Event) {
    ev.preventDefault();
    this.bus.populate(item);
  }


  private startFakeDelay() {

      const messages = [
      'Sending request to PGE Document Archive',
      'Retrieving PDF Regulation Documents',
      'Sending Summary to Open AI For Analysis',
      'Formatting Response...',
    ];

    // Emit every 5 seconds
    interval(4000)
      .pipe(takeUntil(interval(15000))) // stop after 15s
      .subscribe((i) => {
        // Stop safely if out of range
        const msg = messages[i] ?? 'Finished';
        this.generatingContent.set(msg);
      });

       

  }


}

// list.store.ts
import { Injectable, computed, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListStore {
  // source of truth
  private readonly _items = signal<string[]>([]);

  // public readonly signals
  readonly items = computed(() => this._items());
  readonly count = computed(() => this._items().length);

  // actions
  add(item: string) {
    this._items.update(list => [...list, item]);
  }

  removeAt(index: number) {
  //  this._items.update(list => list.toSpliced(index, 1));
    this._items.update(list => [...list.slice(0, index), ...list.slice(index + 1)]);

  }

  clear() {
    this._items.set([]);
    
  }

  // (Optional) simple persistence
  constructor() {
    // hydrate from storage
    const stored = localStorage.getItem('items');
    if (stored) this._items.set(JSON.parse(stored));

    // persist on change
    effect(() => {
      localStorage.setItem('items', JSON.stringify(this._items()));
    });
  }
}

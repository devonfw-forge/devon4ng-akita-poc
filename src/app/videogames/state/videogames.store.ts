import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Videogame } from './videogame.model';
import { uiStore, VideogamesUIStore } from './videogames-ui.store';

export interface VideogamesState extends EntityState<Videogame> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'videogames',
})
export class VideogamesStore extends EntityStore<VideogamesState, Videogame> {

  readonly uiStore: VideogamesUIStore = uiStore;

  constructor() {
    super();
  }

}


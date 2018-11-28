import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Videogame } from './videogame.model';
import { VISIBILITY_FILTER } from './videogames-filter.model';
import { uiStore, VideogamesUIStore } from './videogames-ui.store';

export interface VideogamesState extends EntityState<Videogame> {
  ui: {
    filter: VISIBILITY_FILTER;
  };
}

const initialState: VideogamesState = {
  ui: { filter: VISIBILITY_FILTER.SHOW_ALL }
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'videogames',
})
export class VideogamesStore extends EntityStore<VideogamesState, Videogame> {

  readonly uiStore: VideogamesUIStore = uiStore;

  constructor() {
    super(initialState);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.updateRoot({ ui: { filter } });
  }
}

import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Videogame } from './videogame.model';

export interface VideogamesState extends EntityState<Videogame> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'videogames',
})
export class VideogamesStore extends EntityStore<VideogamesState, Videogame> {

  constructor() {
    super();
  }

}


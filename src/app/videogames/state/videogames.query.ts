import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { VideogamesStore, VideogamesState } from './videogames.store';
import { Videogame } from './videogame.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideogamesQuery extends QueryEntity<VideogamesState, Videogame> {

  constructor(protected store: VideogamesStore) {
    super(store);
  }

  getVideogames(term: string, sortBy: keyof Videogame): Observable<Videogame[]> {
    return this.selectAll({
      sortBy,
      filterBy: (entity) => entity.name.toLowerCase().includes(term)
    });
  }
}

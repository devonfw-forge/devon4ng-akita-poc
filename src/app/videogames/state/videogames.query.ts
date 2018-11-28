import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Videogame } from './videogame.model';
import { VideogamesState, VideogamesStore } from './videogames.store';

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

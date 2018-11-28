import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable, combineLatest } from 'rxjs';
import { Videogame } from './videogame.model';
import { VISIBILITY_FILTER } from './videogames-filter.model';
import { uiStore, VideogamesUIState, VideogameUI } from './videogames-ui.store';
import { VideogamesState, VideogamesStore } from './videogames.store';
import { map } from 'rxjs/operators';

const uiQuery: QueryEntity<VideogamesUIState, VideogameUI> = new QueryEntity<VideogamesUIState, VideogameUI>(uiStore);

@Injectable({
  providedIn: 'root',
})
export class VideogamesQuery extends QueryEntity<VideogamesState, Videogame> {

  readonly uiQuery: QueryEntity<VideogamesUIState, VideogameUI> = uiQuery;

  selectVisibilityFilter$: Observable<VISIBILITY_FILTER> = this.select((state: VideogamesState) => state.ui.filter);

  constructor(protected store: VideogamesStore) {
    super(store);
  }

  getVideogames(term: string, sortBy: keyof Videogame): Observable<Videogame[]> {
    return combineLatest(
      this.selectVisibilityFilter$,
      this.selectAll({
        sortBy,
        filterBy: (videogame: Videogame) => videogame.name.toLowerCase().includes(term)
      })
    ).pipe(
      map(([filter, videogames]) => this.getVisibleVideogames(filter, videogames)),
    );
  }

  private getVisibleVideogames(filter, videogames): Videogame[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return videogames.filter((videogame: Videogame) => videogame.completed);
      default:
        return videogames;
    }
  }
}

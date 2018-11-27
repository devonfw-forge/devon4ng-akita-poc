import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createVideogame, Videogame } from './videogame.model';
import { VideogamesDataService } from './videogames-data.service';
import { VideogamesQuery } from './videogames.query';
import { VideogamesStore } from './videogames.store';

@Injectable({
  providedIn: 'root',
})
export class VideogamesService {

  constructor(private videogamesStore: VideogamesStore,
    private videogamesQuery: VideogamesQuery,
    private videogamesDataService: VideogamesDataService) { }

  get(): Observable<Videogame[]> | void {
    const request = this.videogamesDataService.get().pipe(
      tap(response => {
        this.videogamesStore.set(response);
      })
    );

    return this.videogamesQuery.isPristine ? request : noop();
  }

  add(name: string) {
    const videogame: Videogame = createVideogame({ name });
    this.videogamesStore.add(videogame);
    this.videogamesDataService.add(videogame).subscribe();
  }

  remove(id: ID) {
    this.videogamesStore.remove(id);
    this.videogamesDataService.remove(id).subscribe();
  }

  update(id: ID, name: string, description: string, cover: string) {
    this.videogamesStore.update(id, { name, description, cover });
    this.videogamesDataService.udpdate(this.videogamesQuery.getEntity(id)).subscribe();
  }
}

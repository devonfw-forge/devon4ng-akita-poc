import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { videogames } from '../videogames.mocks';
import { Videogame } from './videogame.model';

@Injectable({
  providedIn: 'root'
})
export class VideogamesDataService {

  videogames: Videogame[] = videogames;

  constructor() { }

  get(): Observable<Videogame[]> {
    return timer(1000).pipe(mapTo(this.videogames));
  }

  add(videogame: Videogame): Observable<Videogame> {
    this.videogames.push(videogame);
    return timer(1000).pipe(mapTo(videogame));
  }

  remove(id: ID): Observable<boolean> {
    this.videogames = this.videogames.filter((videogame: Videogame) => {
      return videogame.id !== id;
    });
    return timer(1000).pipe(mapTo(true));
  }

  udpdate(videogame: Videogame): Observable<Videogame> {
    this.videogames = this.videogames.map((vg: Videogame) => {
      if (vg.id === videogame.id) {
        vg = videogame;
      }
      return vg;
    });
    return timer(1000).pipe(mapTo(videogame));
  }
}

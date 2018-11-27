import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Videogame } from '.';
import { mapTo } from 'rxjs/operators';
import { videogames } from '../videogames.mocks';
import { ID } from '@datorama/akita';

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
    this.videogames.push(<any>videogame);
    return timer(1000).pipe(mapTo(videogame));
  }

  remove(id: ID): Observable<boolean> {
    this.videogames = this.videogames.filter((videogame) => {
      return videogame.id !== id;
    });
    return timer(1000).pipe(mapTo(true));
  }

  udpdate(videogame: Videogame): Observable<Videogame> {
    this.videogames = this.videogames.map((vg) => {
      if (vg.id === videogame.id) {
        vg = videogame;
      }
      return vg;
    });
    return timer(1000).pipe(mapTo(videogame));
  }
}

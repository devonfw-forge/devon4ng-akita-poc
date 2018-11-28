import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Videogame, VideogamesQuery, VideogamesService } from './state';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogamesComponent implements OnInit {

  videogames$: Observable<Videogame[]>;

  loading$: Observable<boolean>;

  search = new FormControl();

  new = new FormControl();

  constructor(private videogamesService: VideogamesService,
    private videogamesQuery: VideogamesQuery) { }

  ngOnInit() {
    const getVideogames: Observable<Videogame[]> | void = this.videogamesService.get();

    if (getVideogames) {
      getVideogames.subscribe();
    }

    this.loading$ = this.videogamesQuery.selectLoading();
    this.videogames$ = combineLatest(
        this.search.valueChanges.pipe(startWith('')),
        'name'
      )
      .pipe(switchMap(([term, sortBy]) => this.videogamesQuery.getVideogames(term, sortBy as keyof Videogame))
    );
  }

  add(): void {
    if (!this.new.value) {
      return;
    }

    this.videogamesService.add(this.new.value);
    this.new.reset();
  }
}

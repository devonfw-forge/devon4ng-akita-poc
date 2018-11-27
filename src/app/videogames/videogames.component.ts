import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Videogame, VideogamesService, VideogamesQuery } from './state';
import { FormControl } from '@angular/forms';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogamesComponent implements OnInit {

  search = new FormControl();

  new = new FormControl();

  videogames$: Observable<Videogame[]>;

  loading$: Observable<boolean>;

  constructor(private videogamesService: VideogamesService,
    private videogamesQuery: VideogamesQuery) { }

  ngOnInit() {
    (<Observable<Videogame[]>>this.videogamesService.get()).subscribe();

    this.loading$ = this.videogamesQuery.selectLoading();
    this.videogames$ = combineLatest(
        this.search.valueChanges.pipe(startWith('')),
        'name'
      )
      .pipe(switchMap(([term, sortBy]) => this.videogamesQuery.getVideogames(term, sortBy as keyof Videogame))
    );
  }

  add(): void {
    this.videogamesService.add(this.new.value);
    this.new.reset();
  }
}

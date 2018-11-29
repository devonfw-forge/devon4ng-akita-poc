import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Videogame, VideogamesQuery, VideogamesService, VISIBILITY_FILTER } from './state';
import { VideogameUI } from './state/videogames-ui.store';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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

  completed = new FormControl();

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

  drop(event: CdkDragDrop<string[]>) {
    this.videogamesService.changePosition(event.previousIndex, event.currentIndex);
  }

  getUIState({ id }: Videogame): Observable<VideogameUI> {
    return this.videogamesQuery.uiQuery.selectEntity(id);
  }

  toggleOpen({ id }: Videogame, open: boolean): void {
    this.videogamesService.toggleOpenVideogameState(id, open);
  }

  filterCompleted(): void {
    const visibility: VISIBILITY_FILTER = (!this.completed.value) ?
      VISIBILITY_FILTER.SHOW_COMPLETED : VISIBILITY_FILTER.SHOW_ALL;
    this.videogamesService.toggleVisibility(visibility);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Videogame, VideogamesService } from '../state';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogameComponent {

  @Input() videogame: Videogame;

  editMode: boolean;

  constructor(private videogamesService: VideogamesService) { }

  remove({ id }: Videogame): void {
    this.videogamesService.remove(id);
  }

  update(name: string, year: number, description: string, cover: string, completed: boolean): void {
    this.videogamesService.update(this.videogame.id, name, year, description, cover, completed);
  }

  markCompleted(completed: boolean): void {
    this.videogamesService.completed(this.videogame.id, completed);
  }
}

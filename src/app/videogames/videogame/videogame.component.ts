import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Videogame, VideogamesService } from '../state';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogameComponent implements OnInit {

  @Input() videogame: Videogame;

  editMode: boolean;

  constructor(private videogamesService: VideogamesService) { }

  ngOnInit() {
  }

  remove({ id }: Videogame): void {
    this.videogamesService.remove(id);
  }

  update(name: string, description: string, cover: string): void {
    this.videogamesService.update(this.videogame.id, name, description, cover);
  }
}

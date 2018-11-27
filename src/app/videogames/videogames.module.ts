import { NgModule } from '@angular/core';
import { VideogamesComponent } from './videogames.component';
import { CoreModule } from '../core/core.module';
import { VideogameComponent } from './videogame/videogame.component';

@NgModule({
  declarations: [
    VideogamesComponent,
    VideogameComponent
  ],
  imports: [
    CoreModule,
  ],
})
export class VideogamesModule { }

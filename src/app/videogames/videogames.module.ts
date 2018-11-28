import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { VideogameComponent } from './videogame/videogame.component';
import { VideogamesComponent } from './videogames.component';

@NgModule({
  declarations: [
    VideogamesComponent,
    VideogameComponent,
  ],
  imports: [
    CoreModule,
  ],
})
export class VideogamesModule { }

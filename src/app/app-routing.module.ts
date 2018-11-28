import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogamesComponent } from './videogames/videogames.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'videogames',
  },
  {
    path: 'videogames',
    component: VideogamesComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }

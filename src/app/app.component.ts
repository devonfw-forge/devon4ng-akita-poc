import { Component, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { akitaDevtools } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private ngZone: NgZone) {

    if (!environment.production) {
      akitaDevtools(ngZone);
    }

  }
}

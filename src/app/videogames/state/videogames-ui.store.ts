import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';

export interface VideogameUI {
  isOpen: boolean;
}

export interface VideogamesUIState extends EntityState<VideogameUI> { }

@StoreConfig({
  name: 'videogames-ui'
})
export class VideogamesUIStore extends EntityStore<VideogamesUIState, VideogameUI> {
  constructor() {
    super();
  }
}

export const uiStore: VideogamesUIStore = new VideogamesUIStore();

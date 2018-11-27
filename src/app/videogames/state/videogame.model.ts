import { ID, guid } from '@datorama/akita';

export interface Videogame {
  id: ID;
  name: string;
  description: string;
  cover: string;
  year: number;
  completed: boolean;
}

export function createVideogame(params: Partial<Videogame>) {
  return {
    id: guid(),
    completed: false,
    cover: '/assets/img/no_photo.png',
    description: 'No Description',
    ...params,
  } as Videogame;
}

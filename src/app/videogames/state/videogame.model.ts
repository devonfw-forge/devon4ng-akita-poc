import { ID, guid } from '@datorama/akita';

export interface Videogame {
  id: ID;
  name: string;
  description: string;
  cover: string;
  year: number | string;
  completed: boolean;
}

export function createVideogame(params: Partial<Videogame>) {
  return {
    id: guid(),
    completed: false,
    cover: '/assets/img/no_photo.png',
    description: 'No Description',
    year: 'N/A',
    ...params,
  } as Videogame;
}

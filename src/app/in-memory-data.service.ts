import { InMemoryDbService } from 'angular-in-memory-web-api';
import players from '../../data/players_singles.json';
import data from '../../data/data_singles.json';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {players, data};
  }
}
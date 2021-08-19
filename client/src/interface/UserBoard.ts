import { Board } from './BoardApi';
import { Columns } from './ColumnApi';
import { Cards } from './CardApi';
import { User } from './User';

export interface UserBoard {
  user: User | null | undefined;
  board: Board;
  columns: Columns;
  cards: Cards;
  boardTitles: string[];
}

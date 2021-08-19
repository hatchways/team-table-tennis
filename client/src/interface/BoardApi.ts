import { Cards } from './CardApi';
import { Columns } from './ColumnApi';

export interface Board {
  _id: string;
  title: string;
  columns: string[];
}
export interface Boards {
  [key: string]: Board;
}

export interface CompleteBoard {
  board: Board;
  cards: Cards;
  columns: Columns;
}

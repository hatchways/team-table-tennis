import { Board } from './BoardApi';
import { User } from './User';

export interface UserBoard {
  user: User | null | undefined;
  board: Board | null | undefined;
}

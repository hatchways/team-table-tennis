import { Board } from './BoardApi';
import { User } from './User';

export interface AuthBoardApiDataSuccess {
  message: string;
  user: User;
  token: string;
  board: Board;
}

export interface AuthBoardApiData {
  error?: { message: string };
  success?: AuthBoardApiDataSuccess;
}

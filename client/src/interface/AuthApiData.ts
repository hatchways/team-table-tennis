import { Board } from './BoardApi';
import { User } from './User';
import { UserBoard } from './UserBoard';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
  board: Board;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}

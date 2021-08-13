import { AuthContext, IAuthContext, useAuth } from './useAuthContext';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { BoardContext, IBoardContext } from '../helpers/APICalls/board';
import { User } from '../interface/User';
import { Board } from '../interface/BoardApi';
export interface IAuthBoardContext {
  AuthContext: React.Context<IAuthContext>;
  BoardContext: React.Context<IBoardContext>;
}
export interface UserBoard {
  loggedInUser: User;
  board: Board;
}

export const AuthBoardContext = createContext<IAuthBoardContext>({
  AuthContext: AuthContext,
  BoardContext: BoardContext,
});

export function useAuthBoard(): IAuthBoardContext {
  return useContext(AuthBoardContext);
}

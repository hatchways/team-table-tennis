import { useState } from 'react';
import { createContext, FunctionComponent, useCallback, useContext } from 'react';
import { Board, Boards, CompleteBoard } from '../../interface/BoardApi';

export interface IBoardContext {
  board: Board | null | undefined;
  updateBoardContexts: (data: any) => void;
}

export const BoardApi = async (): Promise<Boards> => {
  const boardId = '6114745022197a8d30dc040c';
  return await fetch('/boards/' + boardId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

export const GetAllBoard = async (): Promise<CompleteBoard> => {
  const boardId = '6114745022197a8d30dc040c';
  return await fetch('/boards/full/' + boardId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

export const BoardContext = createContext<IBoardContext>({
  board: undefined,
  updateBoardContexts: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [board, setBoard] = useState<Board | null | undefined>();

  const updateBoardContexts = useCallback(
    (data: Board) => {
      console.log('data: ' + data._id);
      setBoard(data);
    },

    [],
  );

  return <BoardContext.Provider value={{ board, updateBoardContexts }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}

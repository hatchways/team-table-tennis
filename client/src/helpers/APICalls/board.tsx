import { useState } from 'react';
import { createContext, FunctionComponent, useCallback, useContext } from 'react';
import { Board, Boards } from '../../interface/BoardApi';

export interface IBoardContext {
  board: Board | null | undefined;
  updateBoardContexts: (data: any) => void;
}

const BoardApi = async (): Promise<Boards> => {
  const boardId = '6114745022197a8d30dc040c';
  return await fetch('http://localhost:3001/boards/' + boardId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};
export default BoardApi;

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
  console.log('use board');
  return useContext(BoardContext);
}

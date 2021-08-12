import { useState } from 'react';
import { createContext, FunctionComponent, useCallback } from 'react';
import { Boards } from '../../interface/BoardApi';
const BoardApi = async (): Promise<Boards> => {
  const boardId = '6114745022197a8d30dc040c';
  return await fetch('http://localhost:3001/boards/6114745022197a8d30dc040c', {
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

export const BoardContext = createContext<any>({
  board: undefined,
  updateBoardContext: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [board, setBoard] = useState();

  const updateBoardContext = useCallback(
    (data: any) => {
      //setBoard(data.boards);
    },

    [],
  );

  return <BoardContext.Provider value={{ board, updateBoardContext }}>{children}</BoardContext.Provider>;
};

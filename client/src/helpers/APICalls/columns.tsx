import { Columns } from '../../interface/ColumnApi';

export const getColumns = async (boardId: string): Promise<Columns> => {
  return await fetch('/boards/columns/' + boardId, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

import { useState } from 'react';
import { createContext, FunctionComponent, useCallback, useContext } from 'react';
import { Board, Boards, CompleteBoard } from '../../interface/BoardApi';
import { Column } from '../../interface/ColumnAPI';

export interface IBoardContext {
  board: Board | null | undefined;
  updateBoardContexts: (data: any) => void;
}

export const BoardApi = async (boardId: string): Promise<Boards> => {
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

export const GetAllBoard = async (boardId: string): Promise<CompleteBoard> => {
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

export const moveColumn = async (
  boardId: string,
  sourceColumnIndex: number,
  destColumnIndex: number,
  draggableId: string,
): Promise<Column[]> => {
  return await fetch('/boards/columns/move', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
    body: JSON.stringify({ boardId, sourceColumnIndex, destColumnIndex, draggableId }),
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'unable to connext to server' },
    }));
};

export const moveCardToAnotherColumn = async (
  sourceColumnId: string,
  destinationColumnId: string,
  sourceCardArray: string[],
  destinationCardArray: string[],
): Promise<any> => {
  return await fetch('/boards/cards/moveToOtherColumn', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
    body: JSON.stringify({ sourceColumnId, destinationColumnId, sourceCardArray, destinationCardArray }),
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'unable to connext to server' },
    }));
};

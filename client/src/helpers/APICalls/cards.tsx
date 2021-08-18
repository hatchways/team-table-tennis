import { Card, Cards } from '../../interface/CardApi';
export const getCards = async (columnId: string): Promise<Cards> => {
  return await fetch('/boards/cards/' + columnId, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};
export const createCard = async (title: string, description: string, columnId: string): Promise<any> => {
  return await fetch('/boards/cards', {
    method: 'POST',
    body: JSON.stringify({ title, description, columnId }),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

export const quickUpdate = async (cardId: string, title: string, color: string): Promise<any> => {
  return await fetch('/boards/cards/quickUpdate', {
    method: 'PUT',
    body: JSON.stringify({ cardId, title, color }),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

export const editDescription = async (cardId: string, description: string): Promise<any> => {
  return await fetch('/boards/cards/editDescription', {
    method: 'PUT',
    body: JSON.stringify({ cardId, description }),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};

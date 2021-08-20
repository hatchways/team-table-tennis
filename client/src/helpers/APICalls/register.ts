import { AuthApiData } from '../../interface/AuthApiData';
import { AuthBoardApiData } from '../../interface/AuthBoardApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const register = async (email: string, password: string): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };
  return await fetch(`/auth/register`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

<<<<<<< HEAD
export const registerBoard = async (username: string, email: string, password: string): Promise<AuthBoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
=======
export const registerBoard = async (email: string, password: string): Promise<AuthBoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
>>>>>>> f5c906a7649220bdf1223819fc054322f20224a8
    credentials: 'include',
  };
  return await fetch(`/auth/register`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

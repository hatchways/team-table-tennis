import { AuthApiData } from '../../interface/AuthApiData';
import { AuthBoardApiData } from '../../interface/AuthBoardApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const fetchOptions: FetchOptions = {
  method: 'GET',
  credentials: 'include',
};

export const loginWithCookiesBoard = async (): Promise<AuthBoardApiData> => {
  return await fetch(`/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const loginWithCookies = async (): Promise<AuthApiData> => {
  return await fetch(`/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

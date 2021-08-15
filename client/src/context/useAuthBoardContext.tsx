import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthBoardApiData, AuthBoardApiDataSuccess } from '../interface/AuthBoardApiData';
import { loginWithCookiesBoard } from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { UserBoard } from '../interface/UserBoard';
import BoardApi from '../helpers/APICalls/board';

export interface IAuthContext {
  loggedInUserBoard: UserBoard | null | undefined;
  updateLoginContext: (data: AuthBoardApiDataSuccess) => void;
  logout: () => void;
}

export const AuthBoardContext = createContext<IAuthContext>({
  loggedInUserBoard: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthBoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUserBoard, setLoggedInUserBoard] = useState<UserBoard | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthBoardApiDataSuccess) => {
      console.log('begin login');

      const userBoard: UserBoard = { user: undefined, board: undefined };
      userBoard.user = data.user;
      BoardApi().then((data) => {
        userBoard.board = data.board;
        setLoggedInUserBoard(userBoard);
        history.push('/dashboard');
      });
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUserBoard(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookiesBoard().then((data: AuthBoardApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          history.push('/dashboard');
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUserBoard(null);
          history.push('/login');
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthBoardContext.Provider value={{ loggedInUserBoard: loggedInUserBoard, updateLoginContext, logout }}>
      {children}
    </AuthBoardContext.Provider>
  );
};

export function useAuthBoard(): IAuthContext {
  return useContext(AuthBoardContext);
}
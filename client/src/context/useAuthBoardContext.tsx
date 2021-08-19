import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthBoardApiData, AuthBoardApiDataSuccess } from '../interface/AuthBoardApiData';
import { loginWithCookiesBoard } from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { UserBoard } from '../interface/UserBoard';
import { GetAllBoard } from '../helpers/APICalls/board';
import { CompleteBoard } from '../interface/BoardApi';
import IAuthBoardContext from '../interface/IAuthBoardContext';

export const AuthBoardContext = createContext<IAuthBoardContext>({
  loggedInUserBoard: {
    user: undefined,
    board: { _id: '-1', title: '', columns: [] },
    columns: {},
    cards: {},
    boardTitles: [],
  },
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthBoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUserBoard, setLoggedInUserBoard] = useState<UserBoard | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthBoardApiDataSuccess) => {
      console.log(data);
      const userBoard: UserBoard = {
        user: undefined,
        board: { _id: '-1', title: '', columns: [] },
        columns: {},
        cards: {},
        boardTitles: data.boardTitles,
      };

      userBoard.user = data.user;
      GetAllBoard(userBoard.user.boards[0]).then((data: CompleteBoard) => {
        userBoard.board = data.board;
        userBoard.cards = data.cards;
        userBoard.columns = data.columns;
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

export function useAuthBoard(): IAuthBoardContext {
  return useContext(AuthBoardContext);
}

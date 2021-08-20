import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthBoardApiData, AuthBoardApiDataSuccess } from '../interface/AuthBoardApiData';
import { loginWithCookiesBoard } from '../helpers/APICalls/loginWithCookies';
import { logoutApi, logoutDemoApi } from '../helpers/APICalls/logout';
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
    selectedBoardIndex: 0,
  },
  updateLoginContext: () => null,
  logout: () => null,
  logoutDemo: () => null,
  changeBoard: (boardIndex: number) => null,
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
        selectedBoardIndex: 0,
      };

      userBoard.user = data.user;
      GetAllBoard(userBoard.user.boards[userBoard.selectedBoardIndex]).then((data: CompleteBoard) => {
        userBoard.board = data.board;
        userBoard.cards = data.cards;
        userBoard.columns = data.columns;
        setLoggedInUserBoard(userBoard);
        history.push('/dashboard');
      });
    },
    [history],
  );
  const changeBoard = useCallback(
    async (boardIndex: number) => {
      if (loggedInUserBoard?.user) {
        GetAllBoard(loggedInUserBoard?.user?.boards[boardIndex])
          .then((data: CompleteBoard) => {
            const userBoard = loggedInUserBoard;
            userBoard.board = data.board;
            userBoard.cards = data.cards;
            userBoard.columns = data.columns;
            userBoard.selectedBoardIndex = boardIndex;
            setLoggedInUserBoard(userBoard);
            history.push('/dashboard');
          })
          .catch((error) => console.error(error));
      }
    },
    [history, loggedInUserBoard],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutApi()
      .then(() => {
        history.push('/login');
        setLoggedInUserBoard(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  const logoutDemo = useCallback(
    async (userId: string) => {
      // needed to remove token cookie
      await logoutDemoApi(userId)
        .then(() => {
          history.push('/login');
          setLoggedInUserBoard(null);
        })
        .catch((error) => console.error(error));
    },
    [history],
  );

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async (isDemo: boolean) => {
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
    checkLoginWithCookies(false);
  }, [updateLoginContext, history]);

  return (
    <AuthBoardContext.Provider
      value={{ loggedInUserBoard: loggedInUserBoard, updateLoginContext, logout, changeBoard, logoutDemo }}
    >
      {children}
    </AuthBoardContext.Provider>
  );
};

export function useAuthBoard(): IAuthBoardContext {
  return useContext(AuthBoardContext);
}

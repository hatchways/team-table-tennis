import { AuthBoardApiDataSuccess } from './AuthBoardApiData';
import { UserBoard } from './UserBoard';

export default interface IAuthBoardContext {
  loggedInUserBoard: UserBoard | null | undefined;
  updateLoginContext: (data: AuthBoardApiDataSuccess, isDemo: boolean) => void;
  logout: () => void;
  logoutDemo: (userId: string) => void;
  changeBoard: (boardIndex: number) => void;
}

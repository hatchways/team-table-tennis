import { AuthBoardApiDataSuccess } from './AuthBoardApiData';
import { UserBoard } from './UserBoard';

export default interface IAuthBoardContext {
  loggedInUserBoard: UserBoard | null | undefined;
  updateLoginContext: (data: AuthBoardApiDataSuccess) => void;
  logout: () => void;
  changeBoard: (boardIndex: number) => void;
}

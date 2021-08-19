import { AuthApiDataSuccess } from './AuthApiData';
import { User } from './User';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
}
export default IAuthContext;
